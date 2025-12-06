/* ========================================================================
   Cinephile — app.js
   Clean cards, filters, modals, request form.
   ======================================================================== */

(() => {
  "use strict";

  // DOM references
  const moviesContainer = document.getElementById("movies-container");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const sortSelect = document.getElementById("sortSelect");
  const bollywoodBtn = document.getElementById("bollywood-btn");
  const hollywoodBtn = document.getElementById("hollywood-btn");
  const animeBtn = document.getElementById("anime-btn");

  const detailModal = document.getElementById("detailModal");
  const modalBody = document.getElementById("modalBody");

  // request modal elements
  const requestBtn = document.getElementById("requestBtn");
  const requestModal = document.getElementById("requestModal");
  const requestClose = document.getElementById("requestClose");
  const requestForm = document.getElementById("requestForm");
  const requestSuccess = document.getElementById("requestSuccess");

  // State
  let activeCategory = "Hollywood";
  let currentSearch = "";
  let currentType = "all";
  let sortBy = "title";

  const QUALITY_KEYS = ["quality480p", "quality720p", "quality1080p", "quality4k"];
  const QUALITY_LABEL = {
    quality480p: "480p",
    quality720p: "720p",
    quality1080p: "1080p",
    quality4k: "4K"
  };

  const create = (tag, className = "", inner = "") => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (inner !== "") el.innerHTML = inner;
    return el;
  };

  // Neon ripple + click feedback
  const addButtonMagic = (btn) => {
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      btn.appendChild(ripple);

      const rect = btn.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      setTimeout(() => ripple.remove(), 500);
    });
  };

  const filterAndSort = (data) => {
    return data
      .filter((item) => item.category === activeCategory)
      .filter((item) =>
        currentType === "all" ? true : currentType === "movies" ? !item.series : item.series
      )
      .filter((item) =>
        item.title.toLowerCase().includes(currentSearch.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "releaseDate") {
          return (new Date(b.releaseDate || 0)) - (new Date(a.releaseDate || 0));
        }
        if (sortBy === "dateAdded") {
          // newest id treated as latest added
          return (b.id || 0) - (a.id || 0);
        }
        return 0;
      });
  };

  const createDownloadBtn = (qualityObj, label) => {
    if (!qualityObj || (!qualityObj.link && !qualityObj.size)) return null;

    const sizeText = qualityObj.size ? ` • ${qualityObj.size}` : "";
    const btn = create("button", "download-btn", `${label}${sizeText}`);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (qualityObj.link) {
        window.open(qualityObj.link, "_blank");
      }
    });

    addButtonMagic(btn);
    return btn;
  };

  // render episodes inside modal, with season switch
  const renderEpisodeListInModal = (
    item,
    selectedSeasonIndex = 0,
    episodesArray = []
  ) => {
    if (selectedSeasonIndex == null || isNaN(selectedSeasonIndex)) {
      selectedSeasonIndex = 0;
    }

    modalBody.innerHTML = "";
    modalBody.appendChild(create("h2", "", `${item.title} — Episodes`));

    const seasonWrap = create("div", "season-row");
    seasonWrap.appendChild(create("label", "", "Season: "));

    const seasonSelect = create("select", "season-select");
    const allSeasons = item.seasons
      ? item.seasons.map((s) => s.season ?? 1)
      : Array.from(
          new Set((episodesArray || []).map((e) => Number(e.season) || 1))
        );

    allSeasons.forEach((seasonNumber, idx) => {
      const opt = create("option", "", `Season ${seasonNumber}`);
      opt.value = idx;
      if (idx === selectedSeasonIndex) opt.selected = true;
      seasonSelect.appendChild(opt);
    });

    seasonWrap.appendChild(seasonSelect);
    modalBody.appendChild(seasonWrap);

    const epList = create("div", "episode-list");
    modalBody.appendChild(epList);

    const loadSeasonEpisodes = (seasonIndex) => {
      epList.innerHTML = "";

      const seasonNumber = allSeasons[seasonIndex];
      const eps = (item.episodes || episodesArray || [])
        .filter((e) => Number(e.season) === Number(seasonNumber))
        .sort((a, b) => Number(a.episode) - Number(b.episode));

      if (!eps.length) {
        epList.appendChild(create("p", "muted", "No episodes available."));
        return;
      }

      eps.forEach((ep) => {
        const row = create("div", "episode-row");

        const left = create("div", "ep-left");
        left.appendChild(
          create("div", "ep-title", ep.title || `Episode ${ep.episode}`)
        );
        left.appendChild(
          create("div", "ep-meta", `Episode ${ep.episode}`)
        );
        row.appendChild(left);

        const right = create("div", "ep-right");
        QUALITY_KEYS.forEach((qk) => {
          if (ep[qk]?.link) {
            const btn = createDownloadBtn(ep[qk], QUALITY_LABEL[qk]);
            if (btn) {
              btn.classList.add("btn-small");
              right.appendChild(btn);
            }
          }
        });

        row.appendChild(right);
        epList.appendChild(row);
      });
    };

    loadSeasonEpisodes(selectedSeasonIndex);

    seasonSelect.addEventListener("change", (e) => {
      loadSeasonEpisodes(Number(e.target.value));
    });

    const closeBtn = create("button", "modal-close", "Close");
    closeBtn.addEventListener("click", () => closeModal());
    addButtonMagic(closeBtn);
    modalBody.appendChild(closeBtn);

    detailModal.setAttribute("aria-hidden", "false");
  };

  const showModal = (item) => {
    modalBody.innerHTML = "";

    const title = create("h2", "", item.title || "Untitled");
    modalBody.appendChild(title);

    if (item.releaseDate) {
      modalBody.appendChild(
        create("div", "release-date", `Release: ${item.releaseDate}`)
      );
    }

    if (item.description) {
      modalBody.appendChild(
        create("p", "modal-desc", item.description)
      );
    }

    // MOVIE (not series)
    if (!item.series) {
      const dl = create("div", "modal-downloads");
      QUALITY_KEYS.forEach((qk) => {
        const btn = createDownloadBtn(item[qk], QUALITY_LABEL[qk]);
        if (btn) dl.appendChild(btn);
      });

      if (!dl.children.length) {
        dl.appendChild(create("p", "muted", "No downloads available yet."));
      }

      modalBody.appendChild(dl);

      const closeBtn = create("button", "modal-close", "Close");
      closeBtn.addEventListener("click", () => closeModal());
      addButtonMagic(closeBtn);
      modalBody.appendChild(closeBtn);

      detailModal.setAttribute("aria-hidden", "false");
      return;
    }

    // SERIES WITH SEASONS ARRAY
    if (Array.isArray(item.seasons) && item.seasons.length) {
      const seasonRow = create("div", "season-row");
      seasonRow.appendChild(create("label", "", "Season: "));

      const seasonSelect = create("select", "season-select");
      item.seasons.forEach((s, idx) => {
        const label = `Season ${s.season ?? idx + 1}${
          s.volume ? " Vol." + s.volume : ""
        }`;
        const opt = create("option", "", label);
        opt.value = idx;
        if (idx === 0) opt.selected = true;
        seasonSelect.appendChild(opt);
      });

      seasonRow.appendChild(seasonSelect);
      modalBody.appendChild(seasonRow);

      const dlWrap = create("div", "modal-downloads");

      const updateSeason = (idx) => {
        dlWrap.innerHTML = "";
        const season = item.seasons[idx];

        QUALITY_KEYS.forEach((qk) => {
          if (season[qk]?.link) {
            const btn = createDownloadBtn(
              season[qk],
              `Full ${QUALITY_LABEL[qk]}`
            );
            if (btn) dlWrap.appendChild(btn);
          }
        });

        const hasSeasonEpisodes =
          season.episodes?.length ||
          (item.episodes || []).some(
            (e) => Number(e.season) === Number(season.season)
          );

        if (hasSeasonEpisodes) {
          const viewEps = create("button", "view-episodes", "View Episodes");
          viewEps.addEventListener("click", (ev) => {
            ev.stopPropagation();
            if (season.episodes?.length) {
              renderEpisodeListInModal(item, idx, season.episodes);
            } else {
              const filtered = (item.episodes || []).filter(
                (e) => Number(e.season) === Number(season.season)
              );
              renderEpisodeListInModal(item, idx, filtered);
            }
          });
          addButtonMagic(viewEps);
          dlWrap.appendChild(viewEps);
        }

        if (!dlWrap.children.length) {
          dlWrap.appendChild(
            create("p", "muted", "No downloads for this season yet.")
          );
        }
      };

      updateSeason(0);
      seasonSelect.addEventListener("change", (e) =>
        updateSeason(Number(e.target.value))
      );

      modalBody.appendChild(dlWrap);

      const closeBtn = create("button", "modal-close", "Close");
      closeBtn.addEventListener("click", () => closeModal());
      addButtonMagic(closeBtn);
      modalBody.appendChild(closeBtn);

      detailModal.setAttribute("aria-hidden", "false");
      return;
    }

    // SERIES WITH EPISODES ONLY
    if (Array.isArray(item.episodes) && item.episodes.length) {
      modalBody.appendChild(
        create("p", "", "This series has episodes available.")
      );

      const viewEps = create("button", "view-episodes", "View Episodes");
      viewEps.addEventListener("click", (ev) => {
        ev.stopPropagation();
        renderEpisodeListInModal(item, 0, item.episodes);
      });
      addButtonMagic(viewEps);
      modalBody.appendChild(viewEps);

      const closeBtn = create("button", "modal-close", "Close");
      closeBtn.addEventListener("click", () => closeModal());
      addButtonMagic(closeBtn);
      modalBody.appendChild(closeBtn);

      detailModal.setAttribute("aria-hidden", "false");
      return;
    }

    // Fallback if nothing else
    modalBody.appendChild(
      create("p", "muted", "No downloads or episodes listed yet.")
    );
    const closeBtn = create("button", "modal-close", "Close");
    closeBtn.addEventListener("click", () => closeModal());
    addButtonMagic(closeBtn);
    modalBody.appendChild(closeBtn);

    detailModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    detailModal.setAttribute("aria-hidden", "true");
  };

  const renderCards = () => {
    moviesContainer.innerHTML = "";
    const filtered = filterAndSort(window.moviesData || []);
    const grid = create("div", "cards-grid");

    filtered.forEach((item) => {
      const card = create("div", "movie-card");

      // Poster
      const posterWrap = create("div", "poster-wrap");
      const poster = create("img", "poster");
      poster.src = item.poster || "";
      poster.alt = item.title || "poster";
      posterWrap.appendChild(poster);
      card.appendChild(posterWrap);

      // Head
      const head = create("div", "card-head");
      head.appendChild(create("h3", "", item.title));
      card.appendChild(head);

      // Category
      card.appendChild(
        create("p", "movie-cat", item.category || "")
      );

      // Download buttons
      const btnContainer = create("div", "card-buttons");

      if (!item.series) {
        const row = create("div", "series-downloads");
        QUALITY_KEYS.forEach((qk) => {
          const btn = createDownloadBtn(item[qk], QUALITY_LABEL[qk]);
          if (btn) row.appendChild(btn);
        });

        if (!row.children.length) {
          btnContainer.appendChild(
            create("p", "muted", "No downloads yet.")
          );
        } else {
          btnContainer.appendChild(row);
        }
      } else {
        // series
        if (item.seasons?.length) {
          const firstSeason = item.seasons[0];
          const row = create("div", "series-downloads");

          QUALITY_KEYS.forEach((qk) => {
            const btn = createDownloadBtn(firstSeason[qk], QUALITY_LABEL[qk]);
            if (btn) row.appendChild(btn);
          });

          const viewBtn = create("button", "view-episodes", "Details");
          viewBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showModal(item);
          });
          addButtonMagic(viewBtn);
          row.appendChild(viewBtn);

          if (!row.children.length) {
            btnContainer.appendChild(
              create("p", "muted", "No downloads yet.")
            );
          } else {
            btnContainer.appendChild(row);
          }
        } else if (item.episodes?.length) {
          const epBtn = create(
            "button",
            "view-episodes",
            "View Episodes"
          );
          epBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showModal(item);
          });
          addButtonMagic(epBtn);
          btnContainer.appendChild(epBtn);
        } else {
          btnContainer.appendChild(
            create("p", "muted", "No downloads yet.")
          );
        }
      }

      card.appendChild(btnContainer);

      // card click opens modal (except when clicking specific download / controls)
      card.addEventListener("click", (e) => {
        if (
          e.target.closest(".download-btn") ||
          e.target.closest(".season-select") ||
          e.target.closest("button.view-episodes")
        ) {
          return;
        }
        showModal(item);
      });

      grid.appendChild(card);
    });

    moviesContainer.appendChild(grid);
  };

  // Attach ripple to main controls as well
  [searchInput, typeFilter, sortSelect, bollywoodBtn, hollywoodBtn, animeBtn, requestBtn].forEach(
    (el) => {
      if (el) addButtonMagic(el);
    }
  );

  // Filters events
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderCards();
    });
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", (e) => {
      currentType = e.target.value;
      renderCards();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderCards();
    });
  }

  // Category buttons
  const setCategory = (category) => {
    activeCategory = category;
    if (bollywoodBtn) bollywoodBtn.classList.toggle("is-active", category === "Bollywood");
    if (hollywoodBtn) hollywoodBtn.classList.toggle("is-active", category === "Hollywood");
    if (animeBtn) animeBtn.classList.toggle("is-active", category === "Anime");
    renderCards();
  };

  if (bollywoodBtn) {
    bollywoodBtn.addEventListener("click", () => setCategory("Bollywood"));
  }
  if (hollywoodBtn) {
    hollywoodBtn.addEventListener("click", () => setCategory("Hollywood"));
  }
  if (animeBtn) {
    animeBtn.addEventListener("click", () => setCategory("Anime"));
  }

  // Detail modal close by backdrop click
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeModal();
    });
  }

  // ==========================
  //  Request Modal + Form
  // ==========================
  if (requestBtn && requestModal && requestClose && requestForm && requestSuccess) {
    requestBtn.addEventListener("click", () =>
      requestModal.setAttribute("aria-hidden", "false")
    );

    requestClose.addEventListener("click", () =>
      requestModal.setAttribute("aria-hidden", "true")
    );

    requestModal.addEventListener("click", (e) => {
      if (e.target === requestModal) {
        requestModal.setAttribute("aria-hidden", "true");
      }
    });

    // Ensure form config for FormSubmit
    if (!requestForm.action) {
      requestForm.action = "https://formsubmit.co/anuragsheoran25@gmail.com";
    }
    requestForm.method = "POST";

    requestForm.addEventListener("submit", () => {
      // When FormSubmit redirects, this page reloads anyway.
      // For visual feedback before redirect:
      requestSuccess.classList.add("is-visible");
    });
  }

  // Initial render
  renderCards();

  // Tiny debug API for you in console if needed
  window.__cinephile = {
    refresh: () => renderCards(),
    openModalForTitle: (title) => {
      const found = (window.moviesData || []).find(
        (m) => m.title.toLowerCase() === (title || "").toLowerCase()
      );
      if (found) showModal(found);
    }
  };
})();
