// ----------------------------
// Load movies & series dynamically
// ----------------------------
function loadMovies(category = "Bollywood") {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    moviesData
        .filter(item => item.category === category)
        .forEach(item => {
            if (item.seasons) {
                // Series with multiple seasons
                const seriesCard = document.createElement("div");
                seriesCard.classList.add("movie-card");

                seriesCard.innerHTML = `
                    <img src="${item.poster}" class="poster">
                    <h2>${item.title} (Series)</h2>
                    <div class="seasons-container"></div>
                `;

                const seasonsContainer = seriesCard.querySelector(".seasons-container");

                item.seasons.forEach(season => {
                    const seasonDiv = document.createElement("div");
                    seasonDiv.classList.add("season-card");
                    seasonDiv.innerHTML = `
                        <h3>Season ${season.season}</h3>
                        <div class="download-buttons">
                            <a href="${season.quality720p.link}" class="download download-btn" data-res="720p • ${season.quality720p.size}">
                                720p • ${season.quality720p.size}
                            </a>
                            <a href="${season.quality1080p.link}" class="download download-btn" data-res="1080p • ${season.quality1080p.size}">
                                1080p • ${season.quality1080p.size}
                            </a>
                        </div>
                    `;
                    seasonsContainer.appendChild(seasonDiv);
                });

                container.appendChild(seriesCard);

            } else {
                // Regular movie
                const card = document.createElement("div");
                card.classList.add("movie-card");
                card.innerHTML = `
                    <img src="${item.poster}" class="poster">
                    <h2>${item.title}</h2>
                    <div class="download-buttons">
                        <a href="${item.quality720p.link}" class="download download-btn" data-res="720p • ${item.quality720p.size}">
                            720p • ${item.quality720p.size}
                        </a>
                        <a href="${item.quality1080p.link}" class="download download-btn" data-res="1080p • ${item.quality1080p.size}">
                            1080p • ${item.quality1080p.size}
                        </a>
                    </div>
                `;
                container.appendChild(card);
            }
        });

    attachAnimations();
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
// Request Form Popup & Daily Limit
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
searchInput.placeholder = "Search movies or shows...";
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
loadMovies("Bollywood");
