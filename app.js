/* ========================================================================== 
   Cinephile — app.js (Dynamic, Ultra-Smooth, Interactive with Full Button & Card Magic)
   ========================================================================== */
(() => {
  'use strict';
  const moviesContainer = document.getElementById('movies-container');
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const sortSelect = document.getElementById('sortSelect');
  const bollywoodBtn = document.getElementById('bollywood-btn');
  const hollywoodBtn = document.getElementById('hollywood-btn');
  const animeBtn = document.getElementById('anime-btn'); // NEW
  const detailModal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const requestBtn = document.getElementById('requestBtn');
  const requestModal = document.getElementById('requestModal');
  const requestClose = document.getElementById('requestClose');
  const requestForm = document.getElementById('requestForm');
  const requestSuccess = document.getElementById('requestSuccess');

  let activeCategory = 'Hollywood';
  let currentSearch = '';
  let currentType = 'all';
  let sortBy = 'title';

  const createElement = (tag, className = '', innerHTML = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  };

  // ---------------- Button Magic ----------------
  const addButtonMagic = (btn) => {
    // Ripple effect
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      btn.appendChild(ripple);
      const rect = btn.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      setTimeout(() => ripple.remove(), 600);
    });

    // Hover glow
    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = `0 0 15px ${getGlowColor(btn)}AA`;
      btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = '';
      btn.style.transform = '';
    });

    // Continuous shimmer/pulse
    let pulse = 0;
    const animate = () => {
      pulse += 0.05;
      const intensity = 0.3 + Math.sin(pulse) * 0.3;
      btn.style.boxShadow = `0 0 ${15 * intensity}px ${getGlowColor(btn)}AA`;
      requestAnimationFrame(animate);
    };
    animate();
  };

  const getGlowColor = (btn) => {
    const bg = btn.style.background;
    if(bg.includes('#ffb347')) return '#ffb347'; // 480p
    if(bg.includes('#ff7b3b')) return '#ff7b3b'; // 720p
    if(bg.includes('#ff3b3b')) return '#ff3b3b'; // 1080p
    if(bg.includes('#8e2de2')) return '#8e2de2'; // 4K
    return '#fff';
  };

  const filterAndSort = (data) => {
    return data
      .filter(item => item.category === activeCategory)
      .filter(item => currentType === 'all' ? true : currentType === 'movies' ? !item.series : item.series)
      .filter(item => item.title.toLowerCase().includes(currentSearch.toLowerCase()))
      .sort((a,b) => sortBy === 'title' ? a.title.localeCompare(b.title) : 0);
  };

  const addCardMagic = (card) => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `translate(${x*0.03}px, ${y*0.03}px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  };

  const renderCards = () => {
    moviesContainer.innerHTML = '';
    const filtered = filterAndSort(moviesData);
    const grid = createElement('div', 'cards-grid');

    filtered.forEach(item => {
      const card = createElement('div', 'movie-card');

      const posterWrap = createElement('div', 'poster-wrap');
      const poster = createElement('img', 'poster');
      poster.src = item.poster;
      poster.alt = item.title;
      posterWrap.appendChild(poster);
      card.appendChild(posterWrap);

      const cardHead = createElement('div', 'card-head');
      cardHead.appendChild(createElement('h3', '', item.title));
      card.appendChild(cardHead);
      card.appendChild(createElement('p', 'movie-cat', item.category));

      const btnContainer = createElement('div', 'card-buttons');

      const downloadQualities = [
        { key:'quality480p', label:'Download 480p', gradient:'linear-gradient(135deg, #ffb347, #ffcc33)' },
        { key:'quality720p', label:'Download 720p', gradient:'linear-gradient(135deg, #ff7b3b, #ff9855)' },
        { key:'quality1080p', label:'Download 1080p', gradient:'linear-gradient(135deg, #ff3b3b, #ff5555)' },
        { key:'quality4k', label:'Download 4K', gradient:'linear-gradient(135deg, #8e2de2, #4a00e0)' }
      ];

      const createDownloadButton = (quality, targetItem) => {
        const linkObj = targetItem[quality.key];
        if(linkObj?.link){
          const btn = createElement('button','download-btn', quality.label);
          btn.style.background = quality.gradient;
          btn.addEventListener('click', e => {
            e.stopPropagation();
            window.open(linkObj.link,'_blank');
          });
          addButtonMagic(btn);
          btnContainer.appendChild(btn);
        }
      };

      if(item.series){
        const seasonSelect = createElement('select','season-select');
        item.seasons.forEach((s, idx)=>{
          const option = createElement('option','','Season '+s.season+(s.volume ? ' Vol.'+s.volume : ''));
          option.value = idx;
          seasonSelect.appendChild(option);
        });
        btnContainer.appendChild(seasonSelect);

        const renderSeasonButtons = (seasonIndex) => {
          btnContainer.querySelectorAll('.download-btn').forEach(b=>b.remove());
          const selectedSeason = item.seasons[seasonIndex];
          downloadQualities.forEach(q=>createDownloadButton(q, selectedSeason));
        };

        renderSeasonButtons(0);
        seasonSelect.addEventListener('change', e=>renderSeasonButtons(e.target.value));

      } else {
        downloadQualities.forEach(q => createDownloadButton(q, item));
      }

      card.appendChild(btnContainer);
      addCardMagic(card);

      card.addEventListener('click', e=>{
        if(!e.target.classList.contains('download-btn') && !e.target.classList.contains('season-select')) showModal(item);
      });

      grid.appendChild(card);
    });

    moviesContainer.appendChild(grid);
  };

  const showModal = (item) => {
    modalBody.innerHTML = `<h2>${item.title}</h2><p>Category: ${item.category}</p>`;
    detailModal.setAttribute('aria-hidden', 'false');
  };
  const closeModal = () => detailModal.setAttribute('aria-hidden', 'true');

  [searchInput, typeFilter, sortSelect, bollywoodBtn, hollywoodBtn, animeBtn, requestBtn].forEach(btn=>{
    if(btn) addButtonMagic(btn);
  });

  searchInput.addEventListener('input', e => { currentSearch = e.target.value; renderCards(); });
  typeFilter.addEventListener('change', e => { currentType = e.target.value; renderCards(); });
  sortSelect.addEventListener('change', e => { sortBy = e.target.value; renderCards(); });

  bollywoodBtn.addEventListener('click',()=>{
    activeCategory='Bollywood';
    bollywoodBtn.classList.add('is-active');
    hollywoodBtn.classList.remove('is-active');
    animeBtn.classList.remove('is-active');
    renderCards();
  });
  hollywoodBtn.addEventListener('click',()=>{
    activeCategory='Hollywood';
    hollywoodBtn.classList.add('is-active');
    bollywoodBtn.classList.remove('is-active');
    animeBtn.classList.remove('is-active');
    renderCards();
  });
  animeBtn.addEventListener('click',()=>{
    activeCategory='Anime';
    animeBtn.classList.add('is-active');
    bollywoodBtn.classList.remove('is-active');
    hollywoodBtn.classList.remove('is-active');
    renderCards();
  });

  modalClose.addEventListener('click', closeModal);
  detailModal.addEventListener('click', e=>{if(e.target===detailModal)closeModal();});

  if(requestBtn && requestModal && requestClose && requestForm && requestSuccess){
    requestBtn.addEventListener('click', ()=>requestModal.setAttribute('aria-hidden','false'));
    requestClose.addEventListener('click', ()=>requestModal.setAttribute('aria-hidden','true'));
    requestModal.addEventListener('click', e=>{if(e.target===requestModal)requestModal.setAttribute('aria-hidden','true');});
    requestForm.addEventListener('submit', e=>{
      e.preventDefault();
      requestSuccess.style.display='block';
      requestForm.reset();
      setTimeout(()=>{requestSuccess.style.display='none';requestModal.setAttribute('aria-hidden','true');},2000);
    });
  }

  bollywoodBtn.classList.remove('is-active');
  hollywoodBtn.classList.add('is-active');
  animeBtn.classList.remove('is-active');

  renderCards();
})();
