/* ========================================================================
   Cinephile — app.js (Refactored for CSS-driven effects)
   Logic-only JS, visuals handled via CSS classes.
   ======================================================================== */

(() => {
  "use strict";

  /* ----------------------------------------------------
     DOM References
  ---------------------------------------------------- */
  const moviesContainer = document.getElementById("movies-container");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const sortSelect = document.getElementById("sortSelect");
  const bollywoodBtn = document.getElementById("bollywood-btn");
  const hollywoodBtn = document.getElementById("hollywood-btn");
  const animeBtn = document.getElementById("anime-btn");

  const detailModal = document.getElementById("detailModal");
  const modalBody = document.getElementById("modalBody");

  const requestBtn = document.getElementById("requestBtn");
  const requestModal = document.getElementById("requestModal");
  const requestClose = document.getElementById("requestClose");
  const requestForm = document.getElementById("requestForm");
  const requestSuccess = document.getElementById("requestSuccess");

  /* ----------------------------------------------------
     State
  ---------------------------------------------------- */
  let activeCategory = "Hollywood";
  let currentSearch = "";
  let currentType = "all";
  let sortBy = "title";

  const QUALITY_KEYS = ["quality480p", "quality720p", "quality1080p", "quality4k"];
  const QUALITY_LABEL = {
    quality480p: "480p",
    quality720p: "720p",
    quality1080p: "1080p",
    quality4k: "4K",
  };

  /* ----------------------------------------------------
     Small Helpers
  ---------------------------------------------------- */
  const create = (tag, className = "", inner = "") => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (inner !== "") el.innerHTML = inner;
    return el;
  };

  // Ripple helper (visual hook, but generic enough to keep here)
  const addButtonRipple = (btn) => {
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

  // Attach FX class + ripple to any button-like element
  const enhanceButton = (btn) => {
    if (!btn) return;
    btn.classList.add("fx-btn");
    addButtonRipple(btn);
  };

  /* ----------------------------------------------------
     Filtering + Sorting
  ---------------------------------------------------- */
  const filterAndSort = (data) => {
    return (data || [])
      .filter((item) => item.category === activeCategory)
      .filter((item) =>
        currentType === "all"
          ? true
          : currentType === "movies"
          ? !item.series
          : item.series
      )
      .filter((item) =>
        item.title.toLowerCase().includes(currentSearch.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "releaseDate")
          return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
        if (sortBy === "dateAdded") return (b.id || 0) - (a.id || 0);
        return 0;
      });
  };

  /* ----------------------------------------------------
     Download Button Factory
  ---------------------------------------------------- */
  const createDownloadBtn = (qualityObj, label) => {
    if (!qualityObj || !qualityObj.link) return null;

    const size = qualityObj.size ? ` • ${qualityObj.size}` : "";
    const btn = create("button", "download-btn", `${label}${size}`);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(qualityObj.link, "_blank");
    });

    enhanceButton(btn);
    return btn;
  };

  /* ----------------------------------------------------
     Homepage: Update Downloads for Selected Season
  ---------------------------------------------------- */
  const updateSeasonDownloads = (item, seasonIndex, container) => {
    container.innerHTML = "";

    const season = item.seasons?.[seasonIndex];

    QUALITY_KEYS.forEach((qk) => {
      const btn = createDownloadBtn(season?.[qk], QUALITY_LABEL[qk]);
      if (btn) container.appendChild(btn);
    });

    const hasEpisodes =
      season?.episodes?.length ||
      (item.episodes &&
        item.episodes.some((e) => Number(e.season) === season.season));

    if (hasEpisodes) {
      const epBtn = create("button", "view-episodes", "Episodes");
      epBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showModal(item);
      });
      enhanceButton(epBtn);
      container.appendChild(epBtn);
    }

    if (!container.children.length) {
      container.appendChild(create("p", "muted", "No downloads available."));
    }
  };

  /* ----------------------------------------------------
     Homepage: Premium Season Dropdown (Smart Position)
  ---------------------------------------------------- */
  const createSeasonDropdown = (item, dlRow) => {
    const dropdown = create("div", "dropdown fx-dropdown");
    const btn = create("button", "dropdown-btn", "");
    const menu = create("div", "dropdown-menu");

    enhanceButton(btn);

    // default label
    btn.textContent = `Season ${item.seasons[0].season} ▾`;

    // build menu
    item.seasons.forEach((s, idx) => {
      const opt = create("div", "dropdown-item", `Season ${s.season}`);
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.textContent = `Season ${s.season} ▾`;
        dropdown.classList.remove("open");
        updateSeasonDownloads(item, idx, dlRow);
      });
      menu.appendChild(opt);
    });

    // smart positioning
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // close others
      document
        .querySelectorAll(".dropdown.open")
        .forEach((d) => d.classList.remove("open"));

      dropdown.classList.toggle("open");

      if (dropdown.classList.contains("open")) {
        const rect = dropdown.getBoundingClientRect();
        const menuHeight = menu.scrollHeight;

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        menu.classList.remove("up", "down");

        if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
          menu.classList.add("up");
        } else {
          menu.classList.add("down");
        }
      }
    });

    dropdown.appendChild(btn);
    dropdown.appendChild(menu);
    return dropdown;
  };

  // Close open dropdowns when clicking anywhere else
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown.open")
      .forEach((d) => d.classList.remove("open"));
  });

  /* ----------------------------------------------------
     Episodes List in Modal
  ---------------------------------------------------- */
  const renderEpisodeListInModal = (
    item,
    selectedSeasonIndex = 0,
    episodesArray = []
  ) => {
    modalBody.innerHTML = "";
    modalBody.appendChild(create("h2", "", `${item.title} — Episodes`));

    const seasonWrap = create("div", "season-row");
    const label = create("label", "", "Season:");
    const select = create("select", "season-select");

    const allSeasons = item.seasons
      ? item.seasons.map((s) => s.season)
      : Array.from(new Set((episodesArray || []).map((e) => Number(e.season))));

    allSeasons.forEach((sn, idx) => {
      const opt = create("option", "", `Season ${sn}`);
      opt.value = idx;
      if (idx === selectedSeasonIndex) opt.selected = true;
      select.appendChild(opt);
    });

    seasonWrap.appendChild(label);
    seasonWrap.appendChild(select);
    modalBody.appendChild(seasonWrap);

    const epList = create("div", "episode-list");
    modalBody.appendChild(epList);

    const loadSeasonEpisodes = (index) => {
      epList.innerHTML = "";
      const sn = allSeasons[index];

      const eps = (item.episodes || episodesArray)
        .filter((e) => Number(e.season) === Number(sn))
        .sort((a, b) => a.episode - b.episode);

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
    select.addEventListener("change", (e) =>
      loadSeasonEpisodes(Number(e.target.value))
    );

    const closeBtn = create("button", "modal-close fx-modal-btn", "Close");
    enhanceButton(closeBtn);
    closeBtn.addEventListener("click", closeModal);
    modalBody.appendChild(closeBtn);

    detailModal.setAttribute("aria-hidden", "false");
  };

  /* ----------------------------------------------------
     Detail Modal (Movie / Series)
  ---------------------------------------------------- */
  const showModal = (item) => {
    modalBody.innerHTML = "";

    modalBody.appendChild(create("h2", "", item.title));

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

    // Movie (no series)
    if (!item.series) {
      const dl = create("div", "modal-downloads");
      QUALITY_KEYS.forEach((qk) => {
        const btn = createDownloadBtn(item[qk], QUALITY_LABEL[qk]);
        if (btn) dl.appendChild(btn);
      });
      modalBody.appendChild(dl);
    }
    // Series with seasons
    else if (item.seasons?.length) {
      const seasonRow = create("div", "season-row");
      const label = create("label", "", "Season:");
      const select = create("select", "season-select");

      item.seasons.forEach((s, i) => {
        const opt = create(
          "option",
          "",
          `Season ${s.season}${s.volume ? " Vol." + s.volume : ""}`
        );
        opt.value = i;
        select.appendChild(opt);
      });

      seasonRow.appendChild(label);
      seasonRow.appendChild(select);
      modalBody.appendChild(seasonRow);

      const dlWrap = create("div", "modal-downloads");
      modalBody.appendChild(dlWrap);

      const loadSeason = (index) => {
        dlWrap.innerHTML = "";
        const season = item.seasons[index];

        QUALITY_KEYS.forEach((qk) => {
          const btn = createDownloadBtn(season[qk], `Full ${QUALITY_LABEL[qk]}`);
          if (btn) dlWrap.appendChild(btn);
        });

        const hasEpisodes =
          season.episodes?.length ||
          (item.episodes || []).some((e) => Number(e.season) === season.season);

        if (hasEpisodes) {
          const view = create("button", "view-episodes", "View Episodes");
          view.addEventListener("click", () => {
            if (season.episodes?.length) {
              renderEpisodeListInModal(item, index, season.episodes);
            } else {
              const filtered = (item.episodes || []).filter(
                (e) => Number(e.season) === season.season
              );
              renderEpisodeListInModal(item, index, filtered);
            }
          });
          enhanceButton(view);
          dlWrap.appendChild(view);
        }
      };

      loadSeason(0);
      select.addEventListener("change", (e) =>
        loadSeason(Number(e.target.value))
      );
    }
    // Series with flat episodes
    else if (item.episodes?.length) {
      const view = create("button", "view-episodes", "View Episodes");
      view.addEventListener("click", () =>
        renderEpisodeListInModal(item, 0, item.episodes)
      );
      enhanceButton(view);
      modalBody.appendChild(view);
    }

    const closeBtn = create("button", "modal-close fx-modal-btn", "Close");
    enhanceButton(closeBtn);
    closeBtn.addEventListener("click", closeModal);
    modalBody.appendChild(closeBtn);

    detailModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    detailModal.setAttribute("aria-hidden", "true");
  };

  // Close modals on backdrop click
  detailModal.addEventListener("click", (e) => {
    if (e.target === detailModal) closeModal();
  });

  requestModal.addEventListener("click", (e) => {
    if (e.target === requestModal) {
      requestModal.setAttribute("aria-hidden", "true");
    }
  });

  // Close detail modal with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (detailModal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
      if (requestModal.getAttribute("aria-hidden") === "false") {
        requestModal.setAttribute("aria-hidden", "true");
      }
    }
  });

  /* ----------------------------------------------------
     Render Cards (Homepage)
  ---------------------------------------------------- */
  const renderCards = () => {
    moviesContainer.innerHTML = "";
    const filtered = filterAndSort(window.moviesData || []);
    const grid = create("div", "cards-grid");

    filtered.forEach((item) => {
      const card = create("div", "movie-card fx-card");

      const posterWrap = create("div", "poster-wrap");
      const poster = create("img", "poster");
      poster.src = item.poster || "";
      poster.alt = item.title;
      posterWrap.appendChild(poster);
      card.appendChild(posterWrap);

      const head = create("div", "card-head");
      head.appendChild(create("h3", "", item.title));
      card.appendChild(head);

      card.appendChild(create("p", "movie-cat", item.category));

      const btnContainer = create("div", "card-buttons");

      // Movie-only downloads
      if (!item.series) {
        const dlRow = create("div", "series-downloads");
        QUALITY_KEYS.forEach((qk) => {
          const btn = createDownloadBtn(item[qk], QUALITY_LABEL[qk]);
          if (btn) dlRow.appendChild(btn);
        });
        btnContainer.appendChild(dlRow);
      }
      // Series
      else {
        if (item.seasons?.length) {
          const dlRow = create("div", "series-downloads");
          const dropdown = createSeasonDropdown(item, dlRow);
          btnContainer.appendChild(dropdown);

          updateSeasonDownloads(item, 0, dlRow);
          btnContainer.appendChild(dlRow);
        } else if (item.episodes?.length) {
          const epBtn = create("button", "view-episodes", "Episodes");
          epBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showModal(item);
          });
          enhanceButton(epBtn);
          btnContainer.appendChild(epBtn);
        }
      }

      card.appendChild(btnContainer);

      // Open modal when clicking card background, not on buttons
      card.addEventListener("click", (e) => {
        if (
          e.target.closest(".download-btn") ||
          e.target.closest(".dropdown") ||
          e.target.closest(".view-episodes")
        ) {
          return;
        }
        showModal(item);
      });

      grid.appendChild(card);
    });

    moviesContainer.appendChild(grid);
  };

  /* ----------------------------------------------------
     Event Bindings (Filters, Category, Request)
  ---------------------------------------------------- */

  // Enhance header & request button with ripple / FX class
  [searchInput, typeFilter, sortSelect, bollywoodBtn, hollywoodBtn, animeBtn, requestBtn]
    .forEach((el) => el && enhanceButton(el));

  searchInput?.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderCards();
  });

  typeFilter?.addEventListener("change", (e) => {
    currentType = e.target.value;
    renderCards();
  });

  sortSelect?.addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderCards();
  });

  hollywoodBtn.addEventListener("click", () => {
    activeCategory = "Hollywood";
    hollywoodBtn.classList.add("is-active");
    animeBtn.classList.remove("is-active");
    bollywoodBtn.classList.remove("is-active");
    renderCards();
  });

  animeBtn.addEventListener("click", () => {
    activeCategory = "Anime";
    animeBtn.classList.add("is-active");
    hollywoodBtn.classList.remove("is-active");
    bollywoodBtn.classList.remove("is-active");
    renderCards();
  });

  bollywoodBtn.addEventListener("click", () => {
    activeCategory = "Bollywood";
    bollywoodBtn.classList.add("is-active");
    animeBtn.classList.remove("is-active");
    hollywoodBtn.classList.remove("is-active");
    renderCards();
  });

  requestBtn.addEventListener("click", () => {
    requestModal.setAttribute("aria-hidden", "false");
  });

  requestClose.addEventListener("click", () => {
    requestModal.setAttribute("aria-hidden", "true");
  });

  // Use CSS class for success message instead of inline display hacks
  requestForm.addEventListener("submit", () => {
    requestSuccess.classList.add("is-visible");
    setTimeout(() => {
      requestModal.setAttribute("aria-hidden", "true");
      requestSuccess.classList.remove("is-visible");
    }, 2000);
  });

  /* ----------------------------------------------------
     Initial Render
  ---------------------------------------------------- */
  renderCards();
})();
