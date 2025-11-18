const data = {
  hollywood: {
    movies: [
      {
        title: "Inception",
        p720: "720p_link_here",
        size720: "850MB",
        p1080: "1080p_link_here",
        size1080: "1.6GB"
      },
      {
        title: "Interstellar",
        p720: "720p_link_here",
        size720: "900MB",
        p1080: "1080p_link_here",
        size1080: "2GB"
      }
    ],
    shows: [
      {
        title: "Breaking Bad S01",
        p720: "720p_link",
        size720: "2.5GB",
        p1080: "1080p_link",
        size1080: "4GB"
      }
    ]
  },

  bollywood: {
    movies: [
      {
        title: "Dangal",
        p720: "720p_link",
        size720: "1GB",
        p1080: "1080p_link",
        size1080: "2GB"
      }
    ],
    shows: [
      {
        title: "Sacred Games S01",
        p720: "720p_link",
        size720: "2GB",
        p1080: "1080p_link",
        size1080: "3.5GB"
      }
    ]
  }
};

let currentCategory = "hollywood";
let currentSub = "movies";

function showCategory(cat) {
  currentCategory = cat;
  render();
}

function showSub(sub) {
  currentSub = sub;
  render();
}

function render() {
  const area = document.getElementById("contentArea");
  area.innerHTML = "";

  const list = data[currentCategory][currentSub];

  list.forEach(item => {
    area.innerHTML += `
      <div class="movie-item">
        <div class="movie-title">${item.title}</div>
        <div class="download-links">
          <a href="${item.p720}" target="_blank">720p • ${item.size720}</a>
          <a href="${item.p1080}" target="_blank">1080p • ${item.size1080}</a>
        </div>
      </div>
    `;
  });
}

render();

/* Request Sent Animation */
document.getElementById("requestForm").addEventListener("submit", function () {
  setTimeout(() => {
    document.getElementById("sentMessage").classList.add("show");
  }, 700);
});
