document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchHistory = document.getElementById('search-history');
    const clearHistoryButton = document.getElementById('clear-history');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistoryDisplay() {
        searchHistory.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            li.addEventListener('click', () => {
                searchInput.value = term;
                performSearch();
            });
            searchHistory.appendChild(li);
        });
    }

    function addToHistory(term) {
        const index = history.indexOf(term);
        if (index > -1) {
            history.splice(index, 1);
        }
        history.unshift(term);
        if (history.length > 10) {
            history.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
        updateHistoryDisplay();
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // Here you would typically send the search term to a backend API
            addToHistory(searchTerm);
            searchInput.value = '';
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('searchHistory');
        updateHistoryDisplay();
    });

    updateHistoryDisplay();
});