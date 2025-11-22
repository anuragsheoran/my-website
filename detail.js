(function(){
  function escapeHtml(str){ return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function qs(name){ const params = new URLSearchParams(window.location.search); return params.get(name); }
  function createNode(html){ const tmp = document.createElement('div'); tmp.innerHTML = html; return tmp.firstElementChild; }

  const root = document.getElementById('detailRoot');
  const titleParam = qs('title');
  if (!titleParam){ root.innerHTML = '<p style="color:#f3f3f3">No title provided. <a href="/">Go back</a></p>'; return; }
  const decoded = decodeURIComponent(titleParam);
  // wait until data.js defines moviesData (it should be loaded before this script)
  function findAndRender(){
    if (typeof moviesData === 'undefined'){
      setTimeout(findAndRender, 50); return;
    }
    const movie = moviesData.find(m=>m.title === decoded);
    if (!movie){ root.innerHTML = `<p style="color:#f3f3f3">Item not found: ${escapeHtml(decoded)}. <a href="/">Back</a></p>`; return; }

    // build detail layout
    let html = `
      <section class="detail-hero">
        <div class="detail-poster" style="background-image: url('${movie.poster}');" role="img" aria-label="${escapeHtml(movie.title)} poster"></div>
        <div class="detail-meta">
          <h2>${escapeHtml(movie.title)}</h2>
          <p class="detail-category">${escapeHtml(movie.category || '')}</p>
          <p class="detail-synopsis">${escapeHtml(movie.synopsis || '')}</p>
          <div class="detail-actions"></div>
        </div>
      </section>
    `;

    if (movie.series){
      html += `<section class="detail-seasons"><h3>Seasons</h3>`;
      movie.seasons.forEach(s=>{
        html += `<div class="season-row"><strong>Season ${s.season}${s.volume? ' Vol. '+s.volume:''}</strong><div class="season-links"><a class="download-btn" target="_blank" rel="noopener" href="${s.quality1080p.link}">1080p • ${s.quality1080p.size}</a><a class="download-btn" target="_blank" rel="noopener" href="${s.quality720p.link}">720p • ${s.quality720p.size}</a></div></div>`;
      });
      html += `</section>`;
    } else {
      html += `<section class="detail-downloads"><h3>Downloads</h3><div class="season-links"><a class="download-btn" target="_blank" rel="noopener" href="${movie.quality1080p.link}">1080p • ${movie.quality1080p.size}</a><a class="download-btn" target="_blank" rel="noopener" href="${movie.quality720p.link}">720p • ${movie.quality720p.size}</a></div></section>`;
    }

    html += `<p style="margin-top:18px"><a class="btn" href="/">← Back to catalogue</a></p>`;

    root.innerHTML = html;
    // attach light animations to download buttons
    document.querySelectorAll('.download-btn').forEach(b=>{ b.style.transition='transform 140ms ease'; b.onmouseenter=()=>b.style.transform='translateY(-3px) scale(1.02)'; b.onmouseleave=()=>b.style.transform='translateY(0) scale(1)'; });
  }
  findAndRender();
})();
