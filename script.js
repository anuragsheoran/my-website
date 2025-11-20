// ----------------------------
// Helpers: fade animation
// ----------------------------
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.transform = "translateY(10px)";
    setTimeout(() => {
        element.style.transition = "0.35s ease";
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    }, 20);
}

// ----------------------------
// Memory Keys
// ----------------------------
const ACTIVE_CATEGORY_KEY = "cine_active_category";
const ACTIVE_SEASON_KEY = title => `cine_active_season_${title}`;

// ----------------------------
// Load movies dynamically
// ----------------------------
function loadMovies(category = "Bollywood") {
    localStorage.setItem(ACTIVE_CATEGORY_KEY, category);

    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    moviesData
        .filter(movie => movie.category === category)
        .forEach(movie => {
            let cardHTML = "";

            if (movie.series) {
                let seasonsHTML = "";
                movie.seasons.forEach((season, idx) => {
                    let seasonLabel = season.volume
                        ? `Season ${season.season} Vol. ${season.volume}`
                        : `Season ${season.season}`;

                    seasonsHTML += `
                        <button class="season-btn"
                            data-movie="${movie.title}"
                            data-season="${idx}">
                            ${seasonLabel}
                        </button>`;
                });

                cardHTML = `
                <div class="movie-card">
                    <img src="${movie.poster}" class="poster">
                    <h2>${movie.title}</h2>
                    <p class="movie-cat">${movie.category}</p>

                    <div class="seasons-container">
                        ${seasonsHTML}
                    </div>

                    <div class="download-buttons"></div>
                </div>`;
            }

            else {
                // Normal Movie Card
                cardHTML = `
                <div class="movie-card">
                    <img src="${movie.poster}" class="poster">
                    <h2>${movie.title}</h2>
                    <p class="movie-cat">${movie.category}</p>

                    <div class="download-buttons">
                        <a href="${movie.quality1080p.link}" class="download download-btn"
                           data-res="1080p • ${movie.quality1080p.size}">
                           1080p • ${movie.quality1080p.size}
                        </a>

                        <a href="${movie.quality720p.link}" class="download download-btn"
                           data-res="720p • ${movie.quality720p.size}">
                           720p • ${movie.quality720p.size}
                        </a>
                    </div>
                </div>`;
            }

            container.innerHTML += cardHTML;
        });

    // Fade-in animation for each new card
    document.querySelectorAll(".movie-card").forEach(card => fadeIn(card));

    attachAnimations();
    attachSeasonButtonEvents();
}

// ----------------------------
// Category Buttons
// ----------------------------
document.getElementById("bollywood-btn").onclick = () => {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById("bollywood-btn").classList.add("active");
    loadMovies("Bollywood");
};

document.getElementById("hollywood-btn").onclick = () => {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById("hollywood-btn").classList.add("active");
    loadMovies("Hollywood");
};

// Restore previously selected category
const savedCategory = localStorage.getItem(ACTIVE_CATEGORY_KEY);
if (savedCategory) {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(savedCategory.toLowerCase() + "-btn").classList.add("active");
}

// ----------------------------
// Download Button Animation
// ----------------------------
function attachAnimations() {
    document.querySelectorAll('.download').forEach(link => {
        link.addEventListener('mouseenter', () => link.style.transform = 'scale(1.05)');
        link.addEventListener('mouseleave', () => link.style.transform = 'scale(1)');

        link.addEventListener('click', () => {
            const original = link.dataset.res;
            link.innerText = "Preparing...";
            setTimeout(() => link.innerText = original, 1000);
        });
    });
}

// ----------------------------
// Season Button Logic
// ----------------------------
function attachSeasonButtonEvents() {
    const seasonBtns = document.querySelectorAll('.season-btn');

    seasonBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            // highlight active season
            seasonBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const movieTitle = this.dataset.movie;
            const seasonIdx = parseInt(this.dataset.season);

            // save active season
            localStorage.setItem(ACTIVE_SEASON_KEY(movieTitle), seasonIdx);

            const movie = moviesData.find(m => m.title === movieTitle);
            const season = movie.seasons[seasonIdx];

            const downloadDiv = this.parentElement.nextElementSibling;

            downloadDiv.innerHTML = `
                <a href="${season.quality1080p.link}" class="download download-btn"
                   data-res="1080p • ${season.quality1080p.size}">
                   1080p • ${season.quality1080p.size}
                </a>

                <a href="${season.quality720p.link}" class="download download-btn"
                   data-res="720p • ${season.quality720p.size}">
                   720p • ${season.quality720p.size}
                </a>
            `;

            attachAnimations();

            // Scroll season area into view smoothly
            this.closest(".movie-card").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            // Click pulse animation
            this.style.animation = "pulse 0.35s ease";
            setTimeout(() => (this.style.animation = ""), 350);
        });
    });

    // Restore previously selected seasons
    seasonBtns.forEach(btn => {
        const movieTitle = btn.dataset.movie;
        const savedSeason = localStorage.getItem(ACTIVE_SEASON_KEY(movieTitle));

        if (savedSeason && parseInt(savedSeason) === parseInt(btn.dataset.season)) {
            btn.click(); // auto-load season links
        }
    });
}

// ----------------------------
// Request Form Logic (same)
// ----------------------------
const requestForm = document.getElementById("requestForm");
const submitBtn = document.getElementById("submitBtn");

function getTodayKey() {
    const today = new Date().toISOString().split("T")[0];
    return `requests_${today}`;
}

function getRequestCount() {
    return parseInt(localStorage.getItem(getTodayKey())) || 0;
}

function incrementRequestCount() {
    localStorage.setItem(getTodayKey(), getRequestCount() + 1);
}

let cooldown = false;

function startCooldown() {
    cooldown = true;
    submitBtn.disabled = true;

    let timer = 12;
    submitBtn.innerText = `Wait ${timer}s`;

    const interval = setInterval(() => {
        timer--;
        submitBtn.innerText = `Wait ${timer}s`;

        if (timer === 0) {
            clearInterval(interval);
            cooldown = false;
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Request";
        }
    }, 1000);
}

requestForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (getRequestCount() >= 12) {
        showPopup("Daily limit reached! Try again tomorrow.");
        return;
    }

    if (cooldown) {
        showPopup("Wait before sending another request.");
        return;
    }

    showPopup("Your request has been sent!");

    incrementRequestCount();
    startCooldown();

    setTimeout(() => requestForm.submit(), 600);
});

function showPopup(message) {
    const overlay = document.createElement("div");
    overlay.classList.add("request-overlay");
    overlay.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(overlay);

    setTimeout(() => overlay.style.opacity = 1, 10);
    setTimeout(() => {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.remove(), 300);
    }, 2500);
}

// ----------------------------
// Search Bar
// ----------------------------
const searchInput = document.createElement("input");
searchInput.placeholder = "Search movies...";
searchInput.classList.add("search-bar");

const topSection = document.querySelector(".content");
topSection.parentNode.insertBefore(searchInput, topSection);

searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll(".movie-card").forEach(card => {
        const title = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = title.includes(q) ? "block" : "none";
    });
});

// ----------------------------
// Default Load
// ----------------------------
loadMovies(savedCategory || "Bollywood");
