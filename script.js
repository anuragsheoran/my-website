// Edit your links here:
const links = [
    { title: "YouTube", url: "https://youtube.com" },
    { title: "Google", url: "https://google.com" },
    { title: "ChatGPT", url: "https://chat.openai.com" }
];

// AUTO-GENERATE LINK CARDS
const container = document.getElementById("links-container");

links.forEach(link => {
    const card = document.createElement("div");
    card.className = "link-card";

    card.innerHTML = `
        <h2 class="link-title">${link.title}</h2>
        <a class="link-url" href="${link.url}" target="_blank">Go To Download Page</a>
    `;

    container.appendChild(card);
});
