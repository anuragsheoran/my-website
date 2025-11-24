/* ==========================================================================
   Cinephile — app.js (Dynamic, Ultra-Smooth, Interactive with Request Feature)
   ========================================================================== */
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

  // Request modal elements
  const requestBtn = document.getElementById('requestBtn');
  const requestModal = document.getElementById('requestModal');
  const requestClose = document.getElementById('requestClose');
  const requestForm = document.getElementById('requestForm');
  const requestSuccess = document.getElementById('requestSuccess');

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

      // Poster
      const posterWrap = createElement('div', 'poster-wrap');
      const poster = createElement('img', 'poster');
      poster.src = item.poster;
      poster.alt = item.title;
      posterWrap.appendChild(poster);
      card.appendChild(posterWrap);

      // Title & Category
      const cardHead = createElement('div', 'card-head');
      cardHead.appendChild(createElement('h3', '', item.title));
      card.appendChild(cardHead);
      card.appendChild(createElement('p', 'movie-cat', item.category));

      // Buttons
      const btnContainer = createElement('div', 'card-buttons');

      if (item.series) {
        // Season selector
        const seasonSelect = createElement('select', 'season-select');
        item.seasons.forEach((s, idx) => {
          const option = createElement('option', '', `Season ${s.season}${s.volume ? ' Vol.'+s.volume : ''}`);
          option.value = idx;
          seasonSelect.appendChild(option);
        });
        btnContainer.appendChild(seasonSelect);

        // Download buttons
        const seriesBtns = createElement('div', 'series-downloads');
        const download1080 = createElement('button', 'download-btn', 'Download 1080p');
        const download720 = createElement('button', 'download-btn', 'Download 720p');

        download1080.addEventListener('click', () => {
          const selected = item.seasons[seasonSelect.value];
          if (selected.quality1080p?.link) window.open(selected.quality1080p.link, '_blank');
        });
        download720.addEventListener('click', () => {
          const selected = item.seasons[seasonSelect.value];
          if (selected.quality720p?.link) window.open(selected.quality720p.link, '_blank');
        });

        seriesBtns.appendChild(download1080);
        seriesBtns.appendChild(download720);
        btnContainer.appendChild(seriesBtns);

      } else {
        const d1080 = createElement('button', 'download-btn', 'Download 1080p');
        const d720 = createElement('button', 'download-btn', 'Download 720p');
        d1080.addEventListener('click', () => item.quality1080p.link && window.open(item.quality1080p.link, '_blank'));
        d720.addEventListener('click', () => item.quality720p.link && window.open(item.quality720p.link, '_blank'));
        btnContainer.appendChild(d1080);
        btnContainer.appendChild(d720);
      }

      card.appendChild(btnContainer);

      // Card click opens modal
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

  // Event listeners
  searchInput.addEventListener('input', e => { currentSearch = e.target.value; renderCards(); });
  typeFilter.addEventListener('change', e => { currentType = e.target.value; renderCards(); });
  sortSelect.addEventListener('change', e => { sortBy = e.target.value; renderCards(); });

  bollywoodBtn.addEventListener('click', () => {
    activeCategory='Bollywood';
    bollywoodBtn.classList.add('is-active');
    hollywoodBtn.classList.remove('is-active');
    renderCards();
  });
  hollywoodBtn.addEventListener('click', () => {
    activeCategory='Hollywood';
    hollywoodBtn.classList.add('is-active');
    bollywoodBtn.classList.remove('is-active');
    renderCards();
  });

  modalClose.addEventListener('click', closeModal);
  detailModal.addEventListener('click', e => { if(e.target === detailModal) closeModal(); });

  // Request modal functionality
  requestBtn.addEventListener('click', () => requestModal.setAttribute('aria-hidden','false'));
  requestClose.addEventListener('click', () => requestModal.setAttribute('aria-hidden','true'));
  requestModal.addEventListener('click', e => { if(e.target === requestModal) requestModal.setAttribute('aria-hidden','true'); });
  requestForm.addEventListener('submit', (e) => {
    requestSuccess.style.display = 'block';
    setTimeout(() => { requestSuccess.style.display = 'none'; }, 2000);
  });

  renderCards();
})();
