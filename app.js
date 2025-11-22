// Cinephile - clean app script
console.log('Cinephile app starting');

if (typeof moviesData === 'undefined') {
  console.error('moviesData is undefined — ensure data.js is loaded before app.js');
}

const state = {
  category: 'Bollywood',
  query: '',
  type: 'all',
  page: 1,
  perPage: 12,
  sort: 'title'
};

function getFavorites() { return JSON.parse(localStorage.getItem('cine_favorites') || '[]'); }
function saveFavorites(list) { localStorage.setItem('cine_favorites', JSON.stringify(list)); }
function escapeHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function toggleFavorite(title){ const favs = getFavorites(); const idx = favs.indexOf(title); if (idx === -1) favs.push(title); else favs.splice(idx,1); saveFavorites(favs); renderMovies(); }

function renderMovies(){
  const container = document.getElementById('movies-container');
  if (!container) return;
  container.innerHTML = '';
  if (!Array.isArray(moviesData) || moviesData.length === 0) { container.innerHTML = '<p style="padding:20px;color:#f3f3f3">No movies available.</p>'; return; }

  let items = moviesData.filter(m => m.category === state.category);
  if (state.type === 'movies') items = items.filter(m => !m.series);
  if (state.type === 'series') items = items.filter(m => m.series);
  const q = state.query.trim().toLowerCase(); if (q) items = items.filter(m => m.title.toLowerCase().includes(q));
  items.sort((a,b)=>a.title.localeCompare(b.title));

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / state.perPage)); if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * state.perPage;
  const pageItems = items.slice(start, start + state.perPage);

  const favs = getFavorites();
  pageItems.forEach(movie=>{
    const isFav = favs.includes(movie.title);
    if (movie.series) {
      let seasonsHTML = '';
      movie.seasons.forEach((s,idx)=>{ const seasonText = s.volume ? `Season ${s.season} Vol. ${s.volume}` : `Season ${s.season}`; seasonsHTML += `<button class="season-btn" data-movie="${encodeURIComponent(movie.title)}" data-season="${idx}">${escapeHtml(seasonText)}</button>`; });
      container.insertAdjacentHTML('beforeend', `
        <article class="movie-card" data-title="${encodeURIComponent(movie.title)}">
          <div class="poster-wrap" style="background-image: url('${movie.poster}');" role="img" aria-label="${escapeHtml(movie.title)} poster"></div>
          <div class="card-head"><h2 tabindex="0">${escapeHtml(movie.title)}</h2><button class="fav-btn" data-title="${encodeURIComponent(movie.title)}">${isFav ? '★' : '☆'}</button></div>
          <p class="movie-cat">${escapeHtml(movie.category)}</p>
          <div class="seasons-container">${seasonsHTML}</div>
          <div class="download-buttons"></div>
          <button class="details-btn" data-title="${encodeURIComponent(movie.title)}">Details</button>
        </article>
      `);
    } else {
      container.insertAdjacentHTML('beforeend', `
        <article class="movie-card" data-title="${encodeURIComponent(movie.title)}">
          <div class="poster-wrap" style="background-image: url('${movie.poster}');" role="img" aria-label="${escapeHtml(movie.title)} poster"></div>
          <div class="card-head"><h2 tabindex="0">${escapeHtml(movie.title)}</h2><button class="fav-btn" data-title="${encodeURIComponent(movie.title)}">${isFav ? '★' : '☆'}</button></div>
          <p class="movie-cat">${escapeHtml(movie.category)}</p>
          <div class="download-buttons">
            <a href="${movie.quality1080p.link}" class="download download-btn" data-res="1080p • ${movie.quality1080p.size}">1080p • ${movie.quality1080p.size}</a>
            <a href="${movie.quality720p.link}" class="download download-btn" data-res="720p • ${movie.quality720p.size}">720p • ${movie.quality720p.size}</a>
          </div>
          <button class="details-btn" data-title="${encodeURIComponent(movie.title)}">Details</button>
        </article>
      `);
    }
  });

  renderPagination(Math.max(1, Math.ceil(items.length / state.perPage)));
  attachAnimations();
  normalizePosters();
  setupReveal();
}

// Normalize poster heights with JS to ensure consistent visual sizes across browsers
function normalizePosters(){
  // Posters are now rendered as background images in .poster-wrap with CSS aspect-ratio.
  // This function is kept for backwards compatibility but no longer performs DOM size changes.
  return;
}

// Debounced resize to re-normalize posters on viewport changes
let _resizeTimer = null;
window.addEventListener('resize', ()=>{
  if (_resizeTimer) clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(()=>{ normalizePosters(); }, 180);
});

// Reveal-on-scroll using IntersectionObserver (lightweight and performant)
let _revealObserver = null;
function setupReveal(){
  try{
    if (_revealObserver) return; // already set
    const opts = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 };
    _revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const el = entry.target;
        if (entry.isIntersecting){
          el.classList.add('visible');
          _revealObserver.unobserve(el);
        }
      });
    }, opts);
    // observe current cards
    document.querySelectorAll('.movie-card').forEach((el, idx)=>{
      el.classList.add('reveal');
      el.style.setProperty('--i', String(idx));
      _revealObserver.observe(el);
    });
  }catch(e){ console.warn('setupReveal failed', e); }
}

function renderPagination(totalPages){ const nav = document.getElementById('pagination'); if (!nav) return; nav.innerHTML=''; for (let i=1;i<=totalPages;i++){ const btn=document.createElement('button'); btn.className='page-btn'; btn.innerText=i; btn.dataset.page=i; if (i===state.page) btn.classList.add('active'); nav.appendChild(btn);} }

// Handlers
document.getElementById('bollywood-btn').onclick = ()=>{ document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active')); document.getElementById('bollywood-btn').classList.add('active'); state.category='Bollywood'; state.page=1; renderMovies(); };
document.getElementById('hollywood-btn').onclick = ()=>{ document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active')); document.getElementById('hollywood-btn').classList.add('active'); state.category='Hollywood'; state.page=1; renderMovies(); };

function attachAnimations(){ document.querySelectorAll('.download').forEach(link=>{ link.style.transition='transform 140ms ease'; link.onmouseenter=()=>link.style.transform='translateY(-3px) scale(1.02)'; link.onmouseleave=()=>link.style.transform='translateY(0) scale(1)'; link.onclick=()=>{ const original=link.dataset.res; link.innerText='Preparing...'; setTimeout(()=>link.innerText=original,800); }; }); }

// Delegation
document.getElementById('movies-container').addEventListener('click',(e)=>{ const t=e.target; if (t.classList.contains('season-btn')){ const movieTitle = decodeURIComponent(t.dataset.movie); const seasonIdx = Number(t.dataset.season); const movie = moviesData.find(m=>m.title===movieTitle); if (!movie) return; const s=movie.seasons[seasonIdx]; const downloadDiv = t.closest('.movie-card').querySelector('.download-buttons'); if (!downloadDiv) return; downloadDiv.innerHTML = `<a href="${s.quality1080p.link}" class="download download-btn" data-res="1080p • ${s.quality1080p.size}">1080p • ${s.quality1080p.size}</a><a href="${s.quality720p.link}" class="download download-btn" data-res="720p • ${s.quality720p.size}">720p • ${s.quality720p.size}</a>`; attachAnimations(); return; } if (t.classList.contains('fav-btn')){ const title = decodeURIComponent(t.dataset.title); toggleFavorite(title); return; } if (t.classList.contains('details-btn')|| t.tagName==='H2'){ const enc = t.dataset.title || t.closest('.movie-card').dataset.title; const title = enc?decodeURIComponent(enc):null; if (title) showDetails(title); return; } });

document.getElementById('pagination').addEventListener('click',(e)=>{ if (e.target.classList.contains('page-btn')){ state.page = Number(e.target.dataset.page); renderMovies(); }});

// Modal
const modal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
function showDetails(title){ const movie = moviesData.find(m=>m.title===title); if (!movie) return; let html = `<h2>${escapeHtml(movie.title)}</h2><img src="${movie.poster}" class="modal-poster" alt="${escapeHtml(movie.title)} poster"><p>Category: ${escapeHtml(movie.category)}</p>`; if (movie.series){ html += '<div class="modal-seasons">'; movie.seasons.forEach(s=>{ html += `<div class="modal-season"><strong>Season ${s.season}${s.volume? ' Vol. '+s.volume:''}</strong><div class="modal-links"><a href="${s.quality1080p.link}">1080p • ${s.quality1080p.size}</a><a href="${s.quality720p.link}">720p • ${s.quality720p.size}</a></div></div>`; }); html += '</div>'; } else { html += `<div class="modal-links"><a href="${movie.quality1080p.link}">1080p • ${movie.quality1080p.size}</a><a href="${movie.quality720p.link}">720p • ${movie.quality720p.size}</a></div>`; } modalBody.innerHTML = html; modal.setAttribute('aria-hidden','false'); modal.style.display='block'; }
modalClose.addEventListener('click',()=>{ modal.setAttribute('aria-hidden','true'); modal.style.display='none'; });
modal.addEventListener('click',(e)=>{ if (e.target===modal){ modal.setAttribute('aria-hidden','true'); modal.style.display='none'; }});

// Request form
const requestForm = document.getElementById('requestForm');
const submitBtn = document.getElementById('submitBtn');
function getTodayKey(){ const today = new Date().toISOString().split('T')[0]; return `requests_${today}`; }
function getRequestCount(){ return parseInt(localStorage.getItem(getTodayKey())) || 0; }
function incrementRequestCount(){ const count = getRequestCount()+1; localStorage.setItem(getTodayKey(), count); }
let cooldown = false;
function startCooldown(){ cooldown = true; if (submitBtn) submitBtn.disabled = true; let timer=12; if (submitBtn) submitBtn.innerText = `Wait ${timer}s`; const interval = setInterval(()=>{ timer--; if (submitBtn) submitBtn.innerText = `Wait ${timer}s`; if (timer===0){ clearInterval(interval); cooldown=false; if (submitBtn){ submitBtn.disabled=false; submitBtn.innerText='Send Request'; } } },1000); }
if (requestForm && submitBtn){ requestForm.addEventListener('submit', function(e){ e.preventDefault(); if (getRequestCount()>=12){ showPopup('Daily limit reached! Try again tomorrow.'); return; } if (cooldown){ showPopup('Wait before sending another request.'); return; } showPopup('Your request has been sent!'); incrementRequestCount(); startCooldown(); setTimeout(()=>requestForm.submit(),600); }); } else { console.warn('Request form or submit button missing'); }

// Request panel toggle logic (top slide-down panel)
const openRequestBtn = document.getElementById('openRequestBtn');
const requestPanel = document.getElementById('requestPanel');
const closeRequestBtn = document.getElementById('closeRequestBtn');
function openRequestPanel(){
  try{
    if (!requestPanel) return;
    requestPanel.setAttribute('aria-hidden','false');
    // focus first input when visible
    const first = requestPanel.querySelector('input[type="text"]');
    if (first) setTimeout(()=>first.focus(),180);
  }catch(e){ console.warn('openRequestPanel failed', e); }
}
function closeRequestPanel(){ if (!requestPanel) return; requestPanel.setAttribute('aria-hidden','true'); }
if (openRequestBtn) openRequestBtn.addEventListener('click', (e)=>{ e.preventDefault(); openRequestPanel(); });
if (closeRequestBtn) closeRequestBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeRequestPanel(); });
// allow ESC to close
window.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && requestPanel && requestPanel.getAttribute('aria-hidden') === 'false'){ closeRequestPanel(); } });

function showPopup(message){ const overlay = document.createElement('div'); overlay.classList.add('request-overlay'); overlay.innerHTML = `<p>${escapeHtml(message)}</p>`; document.body.appendChild(overlay); setTimeout(()=>overlay.style.opacity=1,10); setTimeout(()=>{ overlay.style.opacity=0; setTimeout(()=>overlay.remove(),300); },2500); }

// Controls
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortSelect = document.getElementById('sortSelect');
if (searchInput) searchInput.addEventListener('input', ()=>{ state.query = searchInput.value; state.page=1; renderMovies(); });
if (typeFilter) typeFilter.addEventListener('change', ()=>{ state.type = typeFilter.value; state.page=1; renderMovies(); });
if (sortSelect) sortSelect.addEventListener('change', ()=>{ state.sort = sortSelect.value; renderMovies(); });

function init(){ document.getElementById('bollywood-btn').classList.toggle('active', state.category==='Bollywood'); document.getElementById('hollywood-btn').classList.toggle('active', state.category==='Hollywood'); if (searchInput) searchInput.value=state.query; if (typeFilter) typeFilter.value=state.type; if (sortSelect) sortSelect.value=state.sort; renderMovies(); }

// Load JSON data (if present) and then initialize. Falls back to global `moviesData` (from `data.js`).
(async function loadDataAndInit(){
  try{
    const resp = await fetch('src/data/movies.json', {cache: 'no-cache'});
    if (resp && resp.ok){
      const json = await resp.json();
      if (Array.isArray(json) && json.length){
        window.moviesData = json; // override global for app consistency
      }
    }
  }catch(e){
    console.warn('Could not load src/data/movies.json, falling back to data.js', e);
  }
  // init after data is guaranteed (or fallback)
  try{ init(); }catch(e){ console.warn('init error', e); }
})();

// (Featured movie removed — promo banner in HTML/CSS replaces the dynamic feature)

// Lightweight parallax for hero shapes and subtle depth on scroll
function setupParallax(){
  const shapes = Array.from(document.querySelectorAll('.hero .shape'));
  if (!shapes.length) return;
  let ticking = false;
  function onScroll(){ if (!ticking){ window.requestAnimationFrame(()=>{ const y = window.scrollY; const vh = window.innerHeight; shapes.forEach((s, idx)=>{ const depth = (idx+1) * 0.02; const translate = y * depth; s.style.transform = `translateY(${translate}px)`; }); ticking = false; }); ticking = true; } }
  window.addEventListener('scroll', onScroll, { passive: true });
  // initial position
  onScroll();
}

// init parallax after DOM ready
window.addEventListener('load', ()=>{ try{ setupParallax(); }catch(e){ console.warn('parallax setup failed', e); } });

// Enforce dark theme (theme toggle removed)
try{ document.documentElement.setAttribute('data-theme', 'dark'); }catch(e){/* noop */}

// Register a simple service worker for caching assets & data (sw.js)
if ('serviceWorker' in navigator){ window.addEventListener('load', ()=>{ navigator.serviceWorker.register('sw.js').then(reg=>{ console.log('SW registered', reg.scope); }).catch(err=>{ console.warn('SW registration failed', err); }); }); }

// Random Spotlight removed per request (dice button removed)