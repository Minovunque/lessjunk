// Gestione del menu hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Chiudi il menu quando si clicca su un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Gestione dello scroll fluido per i link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestione della navbar fissa
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Simulazione di contenuti dinamici
const featuredContent = [
    {
        title: 'Articolo in Evidenza 1',
        category: 'Politica',
        image: 'https://via.placeholder.com/300x200',
        excerpt: 'Breve descrizione dell\'articolo in evidenza...'
    },
    {
        title: 'Articolo in Evidenza 2',
        category: 'Economia',
        image: 'https://via.placeholder.com/300x200',
        excerpt: 'Breve descrizione dell\'articolo in evidenza...'
    },
    {
        title: 'Articolo in Evidenza 3',
        category: 'Tech',
        image: 'https://via.placeholder.com/300x200',
        excerpt: 'Breve descrizione dell\'articolo in evidenza...'
    }
];

// Funzione per creare le card dei contenuti
function createContentCards() {
    const contentGrid = document.querySelector('.content-grid');
    
    featuredContent.forEach(content => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <img src="${content.image}" alt="${content.title}">
            <div class="card-content">
                <span class="category">${content.category}</span>
                <h3>${content.title}</h3>
                <p>${content.excerpt}</p>
            </div>
        `;
        contentGrid.appendChild(card);
    });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    createContentCards();
});

// Gestione del menu temi
const themeButton = document.getElementById('theme-button');
const themeMenu = document.getElementById('theme-menu');
const closeThemeMenu = document.getElementById('close-theme-menu');

function toggleThemeMenu() {
    themeMenu.classList.toggle('active');
    document.body.style.overflow = themeMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    themeMenu.classList.remove('active');
    document.body.style.overflow = '';
}

themeButton.addEventListener('click', toggleThemeMenu);
closeThemeMenu.addEventListener('click', closeMenu);

// Chiudi il menu quando si clicca su un link
document.querySelectorAll('.theme-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Chiudi il menu quando si clicca fuori
themeMenu.addEventListener('click', (e) => {
    if (e.target === themeMenu) {
        closeMenu();
    }
}); 