// ----- Dropdown subcategories -----
const categories = document.querySelectorAll('nav .category');

categories.forEach(cat => {
    cat.addEventListener('mouseenter', () => {
        const sub = cat.querySelector('.subcategory');
        sub.style.display = 'block';
        sub.style.opacity = '0';
        setTimeout(() => {
            sub.style.opacity = '1';
            sub.style.transition = 'opacity 0.3s ease';
        }, 10);
    });
    cat.addEventListener('mouseleave', () => {
        const sub = cat.querySelector('.subcategory');
        sub.style.opacity = '0';
        setTimeout(() => sub.style.display = 'none', 300);
    });
});

// ----- Download link animation -----
const downloadLinks = document.querySelectorAll('.download');

downloadLinks.forEach(link => {
    link.addEventListener('mouseenter', () => link.style.transform = 'scale(1.05)');
    link.addEventListener('mouseleave', () => link.style.transform = 'scale(1)');
    link.addEventListener('click', () => {
        const originalText = link.dataset.resolution;
        link.innerText = 'Downloading...';
        setTimeout(() => link.innerText = originalText, 1000);
    });
});

// ----- Request form animation -----
const form = document.querySelector('.request form');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.classList.add('request-overlay');
    overlay.innerHTML = "<p>Your request has been sent! Check your email to activate the form.</p>";
    document.body.appendChild(overlay);
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.opacity = 1, 10);
    setTimeout(() => {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.remove(), 300);
    }, 3000);
    setTimeout(() => form.submit(), 500);
});

// ----- Search Filter -----
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search movies/shows...';
searchInput.style.marginBottom = '20px';
searchInput.style.padding = '10px';
searchInput.style.width = '100%';
searchInput.style.borderRadius = '8px';
searchInput.style.border = '1px solid #ccc';
const contentSection = document.querySelector('.content');
contentSection.parentNode.insertBefore(searchInput, contentSection);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});
