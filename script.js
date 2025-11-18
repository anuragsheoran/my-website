const grid = document.getElementById("movieGrid");
const search = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".cat-btn");

let activeCategory = "hollywood";

function renderMovies() {
    const query = search.value.toLowerCase();
    grid.innerHTML = "";

    movies
        .filter(m => m.category === activeCategory)
        .filter(m => m.title.toLowerCase().includes(query))
        .forEach(movie => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${movie.img}" alt="">
                <div class="card-body">
                    <h3 class="card-title">${movie.title}</h3>
                    <p class="card-desc">${movie.desc}</p>
                    <a href="${movie.link}" target="_blank" class="download-btn">Download</a>
                </div>
            `;

            grid.appendChild(card);
        });
}

// Category switching
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        activeCategory = btn.dataset.category;
        renderMovies();
    });
});

// Live search
search.addEventListener("input", renderMovies);

// Initial render
renderMovies();
