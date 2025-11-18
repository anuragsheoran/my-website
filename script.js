// Your movie links here:
const links = [
    // Hollywood Movies
    { title: "Inception", url: "https://example.com/inception", category: "hollywood" },
    { title: "Avatar", url: "https://example.com/avatar", category: "hollywood" },
    { title: "Interstellar", url: "https://example.com/interstellar", category: "hollywood" },

    // Bollywood Movies
    { title: "3 Idiots", url: "https://example.com/3idiots", category: "bollywood" },
    { title: "KGF", url: "https://example.com/kgf", category: "bollywood" },
    { title: "Dangal", url: "https://example.com/dangal", category: "bollywood" },
];


// Functions to draw categories:
function renderLinks(searchText = "") {
    const hollywoodDiv = document.getElementById("hollywood");
    const bollywoodDiv = document.getElementById("bollywood");

    hollywoodDiv.innerHTML = "";
    bollywoodDiv.innerHTML = "";

    links
        .filter(link => link.title.toLowerCase().includes(searchText.toLowerCase()))
        .forEach(link => {
            const card = document.createElement("div");
            card.className = "link-card";

            card.innerHTML = `
                <h2 class="link-title">${link.title}</h2>
                <a class="link-url" href="${link.url}" target="_blank">Download</a>
            `;

            if (link.category === "hollywood") hollywoodDiv.appendChild(card);
            if (link.category === "bollywood") bollywoodDiv.appendChild(card);
        });
}

// Search functionality
document.getElementById("search").addEventListener("input", (e) => {
    renderLinks(e.target.value);
});

// Load default links
renderLinks();
