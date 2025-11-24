/* ==========================================================================
   Cinephile — app.js (Dynamic, Ultra-Smooth, Interactive)
   ========================================================================= */
(() => {
  'use strict';
  const moviesContainer = document.getElementById('movies-container');
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const sortSelect = document.getElementById('sortSelect');
  const bollywoodBtn = document.getElementById('bollywood-btn');
  const hollywoodBtn = document.getElementById('hollywood-btn');
  const detailModal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const requestPanel = document.getElementById('requestPanel');
  const openRequestBtn = document.getElementById('openRequestBtn');
  const closeRequestBtn = document.getElementById('closeRequestBtn');

  let activeCategory = 'Bollywood';
  let currentSearch = '';
  let currentType = 'all';
  let sortBy = 'title';

  const createElement = (tag, className = '', innerHTML = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
  };

  const filterAndSort = (data) => {
    return data
      .filter(item => item.category === activeCategory)
      .filter(item => currentType === 'all' ? true : currentType === 'movies' ? !item.series : item.series)
      .filter(item => item.title.toLowerCase().includes(currentSearch.toLowerCase()))
      .sort((a,b) => sortBy === 'title' ? a.title.localeCompare(b.title) : 0);
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

      if (item.series) {
        const seasonSelect = createElement('select', 'season-select');
        item.seasons.forEach((s, idx) => {
          const option = createElement('option', '', `Season ${s.season}`);
          option.value = idx;
          seasonSelect.appendChild(option);
        });
        btnContainer.appendChild(seasonSelect);

        const download1080 = createElement('button', 'download-btn', 'Download 1080p');
        const download720 = createElement('button', 'download-btn', 'Download 720p');

        const updateLinks = () => {
          const selectedSeason = item.seasons[seasonSelect.value];
          download1080.onclick = () => { if(selectedSeason.quality1080p.link) window.open(selectedSeason.quality1080p.link, '_blank'); };
          download720.onclick = () => { if(selectedSeason.quality720p.link) window.open(selectedSeason.quality720p.link, '_blank'); };
        };

        seasonSelect.addEventListener('change', updateLinks);
        updateLinks(); // initialize links for default season

        btnContainer.appendChild(download1080);
        btnContainer.appendChild(download720);

      } else {
        const d1080 = createElement('button', 'download-btn', 'Download 1080p');
        const d720 = createElement('button', 'download-btn', 'Download 720p');
        d1080.addEventListener('click', () => item.quality1080p.link && window.open(item.quality1080p.link, '_blank'));
        d720.addEventListener('click', () => item.quality720p.link && window.open(item.quality720p.link, '_blank'));
        btnContainer.appendChild(d1080);
        btnContainer.appendChild(d720);
      }

      card.appendChild(btnContainer);

      card.addEventListener('click', e => {
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

  searchInput.addEventListener('input', e => { currentSearch = e.target.value; renderCards(); });
  typeFilter.addEventListener('change', e => { currentType = e.target.value; renderCards(); });
  sortSelect.addEventListener('change', e => { sortBy = e.target.value; renderCards(); });

  bollywoodBtn.addEventListener('click', () => { activeCategory='Bollywood'; bollywoodBtn.classList.add('is-active'); hollywoodBtn.classList.remove('is-active'); renderCards(); });
  hollywoodBtn.addEventListener('click', () => { activeCategory='Hollywood'; hollywoodBtn.classList.add('is-active'); bollywoodBtn.classList.remove('is-active'); renderCards(); });

  modalClose.addEventListener('click', closeModal);
  detailModal.addEventListener('click', e => { if(e.target === detailModal) closeModal(); });

  if(openRequestBtn && closeRequestBtn){
    openRequestBtn.addEventListener('click', () => requestPanel.setAttribute('aria-hidden','false'));
    closeRequestBtn.addEventListener('click', () => requestPanel.setAttribute('aria-hidden','true'));
  }

  renderCards();
})();
