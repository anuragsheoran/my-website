/* ==========================================================================
   Cinephile — app.js (Email-enabled Request Form via FormSubmit.co)
   ========================================================================== */
(() => {
  'use strict';

  // Elements
  const moviesContainer = document.getElementById('movies-container');
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const sortSelect = document.getElementById('sortSelect');
  const bollywoodBtn = document.getElementById('bollywood-btn');
  const hollywoodBtn = document.getElementById('hollywood-btn');
  const animeBtn = document.getElementById('anime-btn');

  const detailModal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  // request modal elements
  const requestBtn = document.getElementById('requestBtn');
  const requestModal = document.getElementById('requestModal');
  const requestClose = document.getElementById('requestClose');
  const requestForm = document.getElementById('requestForm');
  const requestSuccess = document.getElementById('requestSuccess');

  // State
  let activeCategory = 'Hollywood';
  let currentSearch = '';
  let currentType = 'all';
  let sortBy = 'title';

  const QUALITY_KEYS = ['quality480p','quality720p','quality1080p','quality4k'];
  const QUALITY_LABEL = {
    quality480p: '480p',
    quality720p: '720p',
    quality1080p: '1080p',
    quality4k: '4K'
  };

  const create = (tag, className = '', inner = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (inner !== '') el.innerHTML = inner;
    return el;
  };

  const addButtonMagic = (btn) => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      const r = document.createElement('span');
      r.className = 'ripple';
      btn.appendChild(r);
      const rect = btn.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top = (e.clientY - rect.top) + 'px';
      setTimeout(() => r.remove(), 500);
    });
  };

  const filterAndSort = (data) => {
    return data
      .filter(item => item.category === activeCategory)
      .filter(item => currentType === 'all' ? true : currentType === 'movies' ? !item.series : item.series)
      .filter(item => item.title.toLowerCase().includes(currentSearch.toLowerCase()))
      .sort((a,b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'releaseDate') {
          return (new Date(b.releaseDate || 0)) - (new Date(a.releaseDate || 0));
        }
        if (sortBy === 'dateAdded') {
          return (b.id || 0) - (a.id || 0);    // NEW SORT: latest added first
        }
          return 0;
    });
  };

  const createDownloadBtn = (qualityObj, label) => {
    const sizeText = qualityObj.size ? ` • ${qualityObj.size}` : '';
    const btn = create('button', 'download-btn', `${label}${sizeText}`);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (qualityObj.link) window.open(qualityObj.link, '_blank');
    });
    addButtonMagic(btn);
    return btn;
  };

  // FIXED FUNCTION — handles null season index correctly
  const renderEpisodeListInModal = (item, selectedSeasonIndex = 0, episodesArray = []) => {
    if (selectedSeasonIndex === null || isNaN(selectedSeasonIndex)) {
      selectedSeasonIndex = 0;
    }

    modalBody.innerHTML = '';

    modalBody.appendChild(create('h2', '', `${item.title} — Episodes`));

    const seasonWrap = create('div', 'season-row');
    seasonWrap.appendChild(create('label', '', 'Season: '));

    const seasonSelect = create('select', 'season-select');

    const allSeasons = item.seasons?.map(s => s.season)
                  || [...new Set(episodesArray.map(e => Number(e.season)))];

    allSeasons.forEach((sn, idx) => {
      const opt = create('option', '', `Season ${sn}`);
      opt.value = idx;
      if (idx === selectedSeasonIndex) opt.selected = true;
      seasonSelect.appendChild(opt);
    });

    seasonWrap.appendChild(seasonSelect);
    modalBody.appendChild(seasonWrap);

    const epList = create('div', 'episode-list');
    modalBody.appendChild(epList);

    const loadSeasonEpisodes = (seasonIndex) => {
      epList.innerHTML = '';

      const seasonNumber = allSeasons[seasonIndex];

      const eps = (item.episodes || episodesArray)
        .filter(e => Number(e.season) === Number(seasonNumber))
        .sort((a,b) => Number(a.episode) - Number(b.episode));

      if (!eps.length) {
        epList.appendChild(create('p','muted','No episodes available'));
        return;
      }

      eps.forEach(ep => {
        const row = create('div', 'episode-row');

        const left = create('div','ep-left');
        left.appendChild(create('div','ep-title', ep.title || `Episode ${ep.episode}`));
        left.appendChild(create('div','ep-meta', `Episode ${ep.episode}`));
        row.appendChild(left);

        const right = create('div','ep-right');
        QUALITY_KEYS.forEach(qk => {
          if (ep[qk]?.link) {
            const btn = createDownloadBtn(ep[qk], QUALITY_LABEL[qk]);
            btn.classList.add('btn-small');
            right.appendChild(btn);
          }
        });

        row.appendChild(right);
        epList.appendChild(row);
      });
    };

    loadSeasonEpisodes(selectedSeasonIndex);

    seasonSelect.addEventListener('change', (e) => {
      loadSeasonEpisodes(Number(e.target.value));
    });

    const closeBtn = create('button','modal-close','Close');
    closeBtn.addEventListener('click', closeModal);
    addButtonMagic(closeBtn);
    modalBody.appendChild(closeBtn);

    detailModal.setAttribute('aria-hidden','false');
  };

  const showModal = (item) => {
    modalBody.innerHTML = '';

    const title = create('h2','', item.title || 'Untitled');
    modalBody.appendChild(title);

    if (item.releaseDate) {
      modalBody.appendChild(create('div','release-date', `Release: ${item.releaseDate}`));
    }

    if (item.description) modalBody.appendChild(create('p','modal-desc', item.description));

    if (!item.series) {
      const dl = create('div','modal-downloads');
      QUALITY_KEYS.forEach(qk => { if (item[qk]?.link) dl.appendChild(createDownloadBtn(item[qk], QUALITY_LABEL[qk])); });
      if (!dl.children.length) dl.appendChild(create('p','muted','No downloads available'));
      modalBody.appendChild(dl);
      const closeBtn = create('button','modal-close','Close'); 
      closeBtn.addEventListener('click', closeModal);
      addButtonMagic(closeBtn);
      modalBody.appendChild(closeBtn);
      detailModal.setAttribute('aria-hidden','false');
      return;
    }

    if (item.seasons?.length) {
      const seasonRow = create('div','season-row');
      seasonRow.appendChild(create('label','', 'Season: '));
      const seasonSelect = create('select','season-select');

      item.seasons.forEach((s, idx) => {
        const label = `Season ${s.season ?? idx+1}${s.volume? ' Vol.'+s.volume:''}`;
        const opt = create('option','',label);
        opt.value = idx;
        seasonSelect.appendChild(opt);
      });

      seasonRow.appendChild(seasonSelect);
      modalBody.appendChild(seasonRow);

      const dlWrap = create('div','modal-downloads');

      const updateSeason = (idx) => {
        dlWrap.innerHTML = '';
        const season = item.seasons[idx];
        QUALITY_KEYS.forEach(qk => {
          if (season[qk]?.link) dlWrap.appendChild(createDownloadBtn(season[qk], `Full ${QUALITY_LABEL[qk]}`));
        });

        if (season.episodes?.length || item.episodes?.some(e=>Number(e.season)===Number(season.season))) {
          const viewEps = create('button','view-episodes','View Episodes');
          viewEps.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            if (season.episodes?.length) {
              renderEpisodeListInModal(item, idx, season.episodes);
            } else {
              const filtered = (item.episodes||[]).filter(e=>Number(e.season)===Number(season.season));
              renderEpisodeListInModal(item, idx, filtered);
            }
          });
          addButtonMagic(viewEps);
          dlWrap.appendChild(viewEps);
        }

        if (!dlWrap.children.length) dlWrap.appendChild(create('p','muted','No downloads for this season'));
      };

      updateSeason(0);
      seasonSelect.addEventListener('change', e=>updateSeason(Number(e.target.value)));

      modalBody.appendChild(dlWrap);
      const closeBtn = create('button','modal-close','Close'); 
      closeBtn.addEventListener('click', closeModal); 
      addButtonMagic(closeBtn); 
      modalBody.appendChild(closeBtn);
      detailModal.setAttribute('aria-hidden','false'); 
      return;
    }

    if (item.episodes?.length) {
      modalBody.appendChild(create('p','', 'This series has episodes available.'));

      const viewEps = create('button','view-episodes','View Episodes');
      viewEps.addEventListener('click',(ev)=>{
        ev.stopPropagation();
        renderEpisodeListInModal(item, 0, item.episodes);
      });
      addButtonMagic(viewEps);
      modalBody.appendChild(viewEps);

      const closeBtn = create('button','modal-close','Close'); 
      closeBtn.addEventListener('click', closeModal); 
      addButtonMagic(closeBtn); 
      modalBody.appendChild(closeBtn);

      detailModal.setAttribute('aria-hidden','false'); 
      return;
    }

    modalBody.appendChild(create('p','muted','No downloads or episodes listed yet.'));
    const closeBtn = create('button','modal-close','Close'); 
    closeBtn.addEventListener('click', closeModal); 
    addButtonMagic(closeBtn); 
    modalBody.appendChild(closeBtn);
    detailModal.setAttribute('aria-hidden','true');
  };

  const closeModal = () => detailModal.setAttribute('aria-hidden','true');

  const renderCards = () => {
    moviesContainer.innerHTML = '';
    const filtered = filterAndSort(moviesData);
    const grid = create('div','cards-grid');

    filtered.forEach(item => {
      const card = create('div','movie-card');

      const posterWrap = create('div','poster-wrap');
      const poster = create('img','poster');
      poster.src = item.poster || '';
      poster.alt = item.title || 'poster';
      posterWrap.appendChild(poster);
      card.appendChild(posterWrap);

      const head = create('div','card-head');
      head.appendChild(create('h3','', item.title));
      card.appendChild(head);
      card.appendChild(create('p','movie-cat', item.category || ''));

      const btnContainer = create('div','card-buttons');

      if (!item.series) {
        QUALITY_KEYS.forEach(qk => {
          if (item[qk]?.link) btnContainer.appendChild(createDownloadBtn(item[qk], QUALITY_LABEL[qk]));
        });

      } else {
        if (item.seasons?.length) {
          const smallSel = create('select','season-select');
          item.seasons.forEach((s, idx) => {
            const opt = create('option','', `S${s.season ?? idx+1}${s.volume ? ' Vol.'+s.volume : ''}`);
            opt.value = idx; 
            smallSel.appendChild(opt);
          });
          btnContainer.appendChild(smallSel);

          const smallDlWrap = create('div','series-downloads');
          const loadSmall = (idx) => {
            smallDlWrap.innerHTML = '';
            const season = item.seasons[idx];

            QUALITY_KEYS.forEach(qk => {
              if (season[qk]?.link) {
                const btn = createDownloadBtn(season[qk], QUALITY_LABEL[qk]);
                btn.classList.add('btn-small'); 
                smallDlWrap.appendChild(btn);
              }
            });

            const filteredEpisodes = (season.episodes || []).length
              ? season.episodes
              : (item.episodes || []).filter(e => Number(e.season) === Number(season.season));

            if (filteredEpisodes.length > 0) {
              const epsView = create('button','btn-ghost','Episodes');
              epsView.addEventListener('click', (ev) => {
                ev.stopPropagation();
                renderEpisodeListInModal(item, Number(idx), filteredEpisodes);
              });
              smallDlWrap.appendChild(epsView);
            }
          };

          loadSmall(0);
          smallSel.addEventListener('change', e => loadSmall(Number(e.target.value)));
          btnContainer.appendChild(smallDlWrap);

        } else if (item.episodes?.length) {
          const epsBtn = create('button','view-episodes','Episodes');
          epsBtn.addEventListener('click', (ev) => { 
            ev.stopPropagation(); 
            renderEpisodeListInModal(item, 0, item.episodes); 
          });
          addButtonMagic(epsBtn); 
          btnContainer.appendChild(epsBtn);

        } else {
          btnContainer.appendChild(create('p','muted','No downloads yet'));
        }
      }

      card.appendChild(btnContainer);

      card.addEventListener('click', (e) => {
        if (e.target.closest('.download-btn') || e.target.closest('.season-select') || e.target.closest('button.view-episodes')) return;
        showModal(item);
      });

      grid.appendChild(card);
    });

    moviesContainer.appendChild(grid);
  };

  [searchInput, typeFilter, sortSelect, bollywoodBtn, hollywoodBtn, animeBtn, requestBtn].forEach(el => {
    if (el) addButtonMagic(el);
  });

  if (searchInput) searchInput.addEventListener('input', (e) => { currentSearch = e.target.value; renderCards(); });
  if (typeFilter) typeFilter.addEventListener('change', (e) => { currentType = e.target.value; renderCards(); });
  if (sortSelect) sortSelect.addEventListener('change', (e) => { sortBy = e.target.value; renderCards(); });

  if (bollywoodBtn) bollywoodBtn.addEventListener('click', () => {
    activeCategory = 'Bollywood';
    bollywoodBtn.classList.add('is-active');
    hollywoodBtn?.classList.remove('is-active');
    animeBtn?.classList.remove('is-active');
    renderCards();
  });

  if (hollywoodBtn) hollywoodBtn.addEventListener('click', () => {
    activeCategory = 'Hollywood';
    hollywoodBtn.classList.add('is-active');
    bollywoodBtn?.classList.remove('is-active');
    animeBtn?.classList.remove('is-active');
    renderCards();
  });

  if (animeBtn) animeBtn.addEventListener('click', () => {
    activeCategory = 'Anime';
    animeBtn.classList.add('is-active');
    bollywoodBtn?.classList.remove('is-active');
    hollywoodBtn?.classList.remove('is-active');
    renderCards();
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  detailModal.addEventListener('click', (e) => { if (e.target === detailModal) closeModal(); });

  /* ===============================
     EMAIL REQUEST FORM — FORM SUBMIT.CO
     =============================== */
  if (requestBtn && requestModal && requestClose && requestForm && requestSuccess) {
    requestBtn.addEventListener('click', () => requestModal.setAttribute('aria-hidden','false'));
    requestClose.addEventListener('click', () => requestModal.setAttribute('aria-hidden','true'));
    requestModal.addEventListener('click', e => { if (e.target === requestModal) requestModal.setAttribute('aria-hidden','true'); });

    // FormSubmit.co — add action & method if not present
    requestForm.action = 'https://formsubmit.co/anuragsheoran25@gmail.com';
    requestForm.method = 'POST';
    requestForm.addEventListener('submit', () => {
      // Show success after a small delay
      setTimeout(() => {
        requestSuccess.style.display = 'block';
      }, 200);
    });
  }

  renderCards();

  window.__cinephile = {
    refresh: () => renderCards(),
    openModalForTitle: (title) => {
      const found = (moviesData || []).find(m => m.title.toLowerCase() === (title||'').toLowerCase());
      if (found) showModal(found);
    }
  };

})();
