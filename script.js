// Editable data
const data = {
    hollywood: {
        movies: [
            {
                title: "Inception",
                year: "2010",
                thumb: "https://i.imgur.com/2yaf2Fq.jpeg",
                dl720: { url: "#", size: "1.1 GB" },
                dl1080: { url: "#", size: "2.4 GB" }
            },
            {
                title: "Interstellar",
                year: "2014",
                thumb: "https://i.imgur.com/SRn6pQu.jpeg",
                dl720: { url: "#", size: "1.3 GB" },
                dl1080: { url: "#", size: "2.9 GB" }
            }
        ],
        tv: [
            {
                title: "Breaking Bad",
                year: "5 Seasons",
                thumb: "https://i.imgur.com/1Bj9gZM.jpeg",
                dl720: { url: "#", size: "8 GB" },
                dl1080: { url: "#", size: "14 GB" }
            }
        ]
    },

    bollywood: {
        movies: [
            {
                title: "3 Idiots",
                year: "2009",
                thumb: "https://i.imgur.com/Tl4LZ4o.jpeg",
                dl720: { url: "#", size: "950 MB" },
                dl1080: { url: "#", size: "1.8 GB" }
            }
        ],
        tv: [
            {
                title: "Scam 1992",
                year: "2020",
                thumb: "https://i.imgur.com/vJ4c9tP.jpeg",
                dl720: { url: "#", size: "4 GB" },
                dl1080: { url: "#", size: "7 GB" }
            }
        ]
    }
};

let currentCat = "hollywood";
let currentSub = "movies";

// Render cards
function renderContent() {
    const container = document.getElementById("content");
    container.innerHTML = "";

    const list = data[currentCat][currentSub];

    list.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.thumb}" class="thumb">
                <div class="title">${item.title}</div>
                <div class="meta">${item.year}</div>

                <div class="downloads">
                    <a class="dl-btn" href="${item.dl720.url}" target="_blank">Download 720p (${item.dl720.size})</a>
                    <a class="dl-btn" href="${item.dl1080.url}" target="_blank">Download 1080p (${item.dl1080.size})</a>
                </div>
            </div>
        `;
    });
}

renderContent();

// Category switch
function switchCategory(cat) {
    currentCat = cat;
    renderContent();
}

// Subcategory switch
function switchSub(sub) {
    currentSub = sub;
    renderContent();
}

// Search filter
function searchContent() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let titles = document.querySelectorAll(".title");

    titles.forEach((t, i) => {
        let match = t.innerText.toLowerCase().includes(query);
        cards[i].style.display = match ? "block" : "none";
    });
}
