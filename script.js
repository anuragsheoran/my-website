const data = {
    hollywood: {
        movies: [
            {
                title: "Inception",
                year: "2010",
                links: {
                    "720p": "your_720p_link_here",
                    "1080p": "your_1080p_link_here"
                }
            },
            {
                title: "Interstellar",
                year: "2014",
                links: {
                    "720p": "your_720p_link_here",
                    "1080p": "your_1080p_link_here"
                }
            }
        ],
        shows: [
            {
                title: "Breaking Bad",
                year: "2008",
                links: {
                    "720p": "your_720p_link_here",
                    "1080p": "your_1080p_link_here"
                }
            }
        ]
    },

    bollywood: {
        movies: [
            {
                title: "3 Idiots",
                year: "2009",
                links: {
                    "720p": "your_720p_link_here",
                    "1080p": "your_1080p_link_here"
                }
            }
        ],
        shows: [
            {
                title: "Sacred Games",
                year: "2018",
                links: {
                    "720p": "your_720p_link_here",
                    "1080p": "your_1080p_link_here"
                }
            }
        ]
    }
};

function showCategory(category) {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const section = data[category];

    renderSection("Movies", section.movies);
    renderSection("TV Shows", section.shows);

    function renderSection(title, list) {
        const titleBlock = document.createElement("h2");
        titleBlock.textContent = title;
        titleBlock.style.textAlign = "center";
        titleBlock.style.marginTop = "20px";
        content.appendChild(titleBlock);

        list.forEach(item => {
            const block = document.createElement("div");
            block.className = "movie-block";

            block.innerHTML = `
                <h3>${item.title}</h3>
                <p class="small">${item.year}</p>

                <div class="download-links">
                    <a href="${item.links["720p"]}" target="_blank">720p</a>
                    <a href="${item.links["1080p"]}" target="_blank">1080p</a>
                </div>
            `;

            content.appendChild(block);
        });
    }
}

// ---------- Request System (Google Sheets backend) ----------

function sendRequest() {
    const input = document.getElementById("requestInput");
    const name = input.value.trim();
    const status = document.getElementById("requestStatus");

    if (name.length === 0) {
        status.textContent = "Please enter a name first.";
        return;
    }

    // Replace this with your Google Apps Script link
    const url = "https://script.google.com/macros/s/AKfycbzL3-O77ukcrxqdpakgETIsedojJX2CQrq5An0kSFmo3qn8dJrcOuxAuIo5YRc1Um1Q/exec";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ request: name })
    });

    status.textContent = "Request sent. We'll add it soon!";
    input.value = "";
}
document.getElementById("requestForm").addEventListener("submit", function () {
  setTimeout(() => {
    document.getElementById("sentMessage").classList.add("show");
  }, 700);
});
