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
  const animeBtn = document.getElementById('anime-btn'); // new Anime button
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
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      btn.appendChild(ripple);
      const rect = btn.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      setTimeout(() => ripple.remove(), 600);
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = '0 0 15px rgba(255,59,59,0.6)';
      btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = '';
      btn.style.transform = '';
    });
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

      const createDownloadButton = (qualityObj, qualityLabel) => {
        const btn = createElement('button', 'download-btn', `${qualityLabel} • ${qualityObj.size}`);
        btn.addEventListener('click', e => {
          e.stopPropagation();
          if (qualityObj.link) window.open(qualityObj.link, '_blank');
        });
        addButtonMagic(btn);
        return btn;
      };

      if(item.series){
        const seasonSelect = createElement('select', 'season-select');
        item.seasons.forEach((s, idx) => {
          const option = createElement('option', '', `Season ${s.season}${s.volume ? ' Vol.'+s.volume : ''}`);
          option.value = idx;
          seasonSelect.appendChild(option);
        });
        btnContainer.appendChild(seasonSelect);

        const seriesBtns = createElement('div', 'series-downloads');

        const addAvailableSeriesButtons = (selectedSeason) => {
          seriesBtns.innerHTML = '';
          ['quality480p','quality720p','quality1080p','quality4k'].forEach(q => {
            if(selectedSeason[q]?.link){
              seriesBtns.appendChild(createDownloadButton(selectedSeason[q], q.replace('quality','')));
            }
          });
        };
        addAvailableSeriesButtons(item.seasons[0]);

        seasonSelect.addEventListener('change', e => {
          addAvailableSeriesButtons(item.seasons[e.target.value]);
        });

        btnContainer.appendChild(seriesBtns);

      } else {
        ['quality480p','quality720p','quality1080p','quality4k'].forEach(q => {
          if(item[q]?.link){
            btnContainer.appendChild(createDownloadButton(item[q], q.replace('quality','')));
          }
        });
      }

      card.appendChild(btnContainer);
      addCardMagic(card);

      card.addEventListener('click', e => {
        if(!e.target.classList.contains('download-btn') && !e.target.classList.contains('season-select')) showModal(item);
      });

      grid.appendChild(card);
    });

    moviesContainer.appendChild(grid);
  };

  const showModal = (item) => {
  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p class="modal-category">Category: ${item.category}</p>
    ${item.releaseDate ? `<p class="modal-release">Release Date: ${item.releaseDate}</p>` : ''}
  `;
  detailModal.setAttribute('aria-hidden', 'false');
};

  const closeModal = () => detailModal.setAttribute('aria-hidden', 'true');

  [searchInput, typeFilter, sortSelect, bollywoodBtn, hollywoodBtn, animeBtn, requestBtn].forEach(btn => {
    if(btn) addButtonMagic(btn);
  });

  searchInput.addEventListener('input', e => { currentSearch = e.target.value; renderCards(); });
  typeFilter.addEventListener('change', e => { currentType = e.target.value; renderCards(); });
  sortSelect.addEventListener('change', e => { sortBy = e.target.value; renderCards(); });

  bollywoodBtn.addEventListener('click', () => {
    activeCategory='Bollywood';
    bollywoodBtn.classList.add('is-active');
    hollywoodBtn.classList.remove('is-active');
    animeBtn?.classList.remove('is-active');
    renderCards();
  });
  hollywoodBtn.addEventListener('click', () => {
    activeCategory='Hollywood';
    hollywoodBtn.classList.add('is-active');
    bollywoodBtn.classList.remove('is-active');
    animeBtn?.classList.remove('is-active');
    renderCards();
  });
  animeBtn?.addEventListener('click', () => {
    activeCategory='Anime';
    animeBtn.classList.add('is-active');
    bollywoodBtn.classList.remove('is-active');
    hollywoodBtn.classList.remove('is-active');
    renderCards();
  });

  modalClose.addEventListener('click', closeModal);
  detailModal.addEventListener('click', e => { if(e.target === detailModal) closeModal(); });

  if(requestBtn && requestModal && requestClose && requestForm && requestSuccess){
    requestBtn.addEventListener('click', () => requestModal.setAttribute('aria-hidden','false'));
    requestClose.addEventListener('click', () => requestModal.setAttribute('aria-hidden','true'));
    requestModal.addEventListener('click', e => { if(e.target === requestModal) requestModal.setAttribute('aria-hidden','true'); });
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      requestSuccess.style.display = 'block';
      requestForm.reset();
      setTimeout(() => { requestSuccess.style.display = 'none'; requestModal.setAttribute('aria-hidden','true'); }, 2000);
    });
  }

  renderCards();
})();
