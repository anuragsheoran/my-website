        movie.seasons.forEach((s, i) => {
            html += `<div class="modal-season"><strong>Season ${s.season}${s.volume ? ' Vol. '+s.volume : ''}</strong>
                <div class="modal-links">
                    <a href="${s.quality1080p.link}">1080p • ${s.quality1080p.size}</a>
                    <a href="${s.quality720p.link}">720p • ${s.quality720p.size}</a>
                </div>
            </div>`;
        });
        html += '</div>';
    } else {
        html += `
            <div class="modal-links">
                <a href="${movie.quality1080p.link}">1080p • ${movie.quality1080p.size}</a>
                <a href="${movie.quality720p.link}">720p • ${movie.quality720p.size}</a>
            </div>
        `;
    }

    modalBody.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
}

modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
    }
});

// Request Form Popup (kept behavior)
const requestForm = document.getElementById('requestForm');
const submitBtn = document.getElementById('submitBtn');

// Defensive checks: if critical DOM elements are missing, log and show message
const moviesContainerEl = document.getElementById('movies-container');
if (!moviesContainerEl) console.error('Missing #movies-container in DOM');

if (typeof moviesData === 'undefined' || !Array.isArray(moviesData) || moviesData.length === 0) {
    if (moviesContainerEl) {
        moviesContainerEl.innerHTML = '<p style="padding:20px;color:#f3f3f3">No data found — `data.js` did not load or contains no items.</p>';
    }
}

function getTodayKey() {
    const today = new Date().toISOString().split('T')[0];
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
            submitBtn.innerText = 'Send Request';
        }
    }, 1000);
}

if (requestForm && submitBtn) {
    requestForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (getRequestCount() >= 12) {
        showPopup('Daily limit reached! Try again tomorrow.');
        return;
    }

    if (cooldown) {
        showPopup('Wait before sending another request.');
        return;
    }

    showPopup('Your request has been sent!');

    incrementRequestCount();
    startCooldown();

    setTimeout(() => requestForm.submit(), 600);
    });
} else {
    console.warn('Request form or submit button missing; request form handlers not attached');
}

function showPopup(message) {
    const overlay = document.createElement('div');
    overlay.classList.add('request-overlay');
    overlay.innerHTML = `<p>${escapeHtml(message)}</p>`;
    document.body.appendChild(overlay);

    setTimeout(() => overlay.style.opacity = 1, 10);
    setTimeout(() => {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.remove(), 300);
    }, 2500);
}

// Controls: search, filters, sort
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortSelect = document.getElementById('sortSelect');

searchInput.addEventListener('input', () => {
    state.query = searchInput.value;
    state.page = 1;
    renderMovies();
});

typeFilter.addEventListener('change', () => {
    state.type = typeFilter.value;
    state.page = 1;
    renderMovies();
});

sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    renderMovies();
});

function init() {
    document.getElementById('bollywood-btn').classList.toggle('active', state.category === 'Bollywood');
    document.getElementById('hollywood-btn').classList.toggle('active', state.category === 'Hollywood');
    searchInput.value = state.query;
    typeFilter.value = state.type;
    sortSelect.value = state.sort;

    renderMovies();
}

init();

// ----------------------------
// Misc helpers
// ----------------------------
function init() {
    // Ensure controls reflect initial state
    document.getElementById('bollywood-btn').classList.toggle('active', state.category === 'Bollywood');
    document.getElementById('hollywood-btn').classList.toggle('active', state.category === 'Hollywood');
    searchInput.value = state.query;
    typeFilter.value = state.type;
    sortSelect.value = state.sort;

    renderMovies();
}

// Start app
init();

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
