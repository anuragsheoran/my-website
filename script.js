// ----------------------------
// Load movies dynamically
// ----------------------------
function loadMovies(category = "Bollywood") {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    moviesData
        .filter(movie => movie.category === category)
        .forEach(movie => {
            if (movie.series) {
                // Series with multiple seasons
                let seasonsHTML = '';
                movie.seasons.forEach((season, idx) => {
                    let seasonText = season.volume ? `Season ${season.season} Vol. ${season.volume}` : `Season ${season.season}`;
                    seasonsHTML += `<button class="season-btn" data-movie="${movie.title}" data-season="${idx}">${seasonText}</button>`;
                });

                container.innerHTML += `
                    <div class="movie-card">
                        <img src="${movie.poster}" class="poster">
                        <h2>${movie.title}</h2>
                        <p class="movie-cat">${movie.category}</p>
                        <div class="seasons-container">
                            ${seasonsHTML}
                        </div>
                        <div class="download-buttons"></div>
                    </div>
                `;
            } else {
                // Normal movie
                container.innerHTML += `
                    <div class="movie-card">
                        <img src="${movie.poster}" class="poster">
                        <h2>${movie.title}</h2>
                        <p class="movie-cat">${movie.category}</p>
                        <div class="download-buttons">
                            <a href="${movie.quality1080p.link}" class="download download-btn" data-res="1080p • ${movie.quality1080p.size}">1080p • ${movie.quality1080p.size}</a>
                            <a href="${movie.quality720p.link}" class="download download-btn" data-res="720p • ${movie.quality720p.size}">720p • ${movie.quality720p.size}</a>
                        </div>
                    </div>
                `;
            }
        });

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

// ----------------------------
// Download Animations
// ----------------------------
function attachAnimations() {
    const links = document.querySelectorAll('.download');

    links.forEach(link => {
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
        btn.addEventListener('click', function() {
            // Highlight the active season
            seasonBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const movieTitle = this.dataset.movie;
            const seasonIdx = this.dataset.season;
            const movie = moviesData.find(m => m.title === movieTitle);
            const season = movie.seasons[seasonIdx];

            const downloadDiv = this.parentElement.nextElementSibling;
            if (!downloadDiv) return;

            downloadDiv.innerHTML = `
                <a href="${season.quality1080p.link}" class="download download-btn" data-res="1080p • ${season.quality1080p.size}">1080p • ${season.quality1080p.size}</a>
                <a href="${season.quality720p.link}" class="download download-btn" data-res="720p • ${season.quality720p.size}">720p • ${season.quality720p.size}</a>
            `;
            attachAnimations();
        });
    });
}

// ----------------------------
// Request Form Popup
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
    const count = getRequestCount() + 1;
    localStorage.setItem(getTodayKey(), count);
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

requestForm.addEventListener("submit", function(e) {
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
    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(card => {
        const title = card.querySelector("h2").innerText.toLowerCase();
        card.style.display = title.includes(q) ? "block" : "none";
    });
});

// ----------------------------
// Default Load
// ----------------------------
loadMovies("Bollywood");
