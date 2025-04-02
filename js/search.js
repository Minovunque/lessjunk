document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" class="search-input" placeholder="Cerca nel sito...">
        <div class="search-results"></div>
    `;
    
    // Inserisci il container dopo l'icona di ricerca
    searchIcon.parentNode.insertBefore(searchContainer, searchIcon.nextSibling);
    
    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');

    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Chiudi la ricerca quando si clicca fuori
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            searchContainer.classList.remove('active');
            searchResults.classList.remove('active');
        }
    });

    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        searchContent(searchTerm);
    }, 300));

    function searchContent(searchTerm) {
        const pages = [
            { url: 'index.html', title: 'Home' },
            { url: 'chi-siamo.html', title: 'Chi Siamo' },
            { url: 'cosa-facciamo.html', title: 'Cosa Facciamo' },
            { url: 'come-lo-facciamo.html', title: 'Come Lo Facciamo' },
            { url: 'perche-lo-facciamo.html', title: 'Perché Lo Facciamo' }
        ];

        const results = [];
        pages.forEach(page => {
            fetch(page.url)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const textContent = doc.body.textContent.toLowerCase();
                    
                    if (textContent.includes(searchTerm)) {
                        results.push({
                            title: page.title,
                            url: page.url,
                            excerpt: getExcerpt(textContent, searchTerm)
                        });
                    }
                })
                .catch(error => console.error('Errore nella ricerca:', error));
        });

        displayResults(results);
    }

    function getExcerpt(text, searchTerm) {
        const index = text.indexOf(searchTerm);
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + 50);
        return '...' + text.substring(start, end) + '...';
    }

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">Nessun risultato trovato</p>';
            searchResults.classList.add('active');
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <a href="${result.url}">
                    <h3>${result.title}</h3>
                    <p>${result.excerpt}</p>
                </a>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
        searchResults.classList.add('active');
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}); 