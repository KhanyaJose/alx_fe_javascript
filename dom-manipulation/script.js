let quotes = [];

// Load existing quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        renderQuotes(quotes);
        populateCategories();

        // Restore the last selected category filter
        const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
        document.getElementById('categoryFilter').value = lastSelectedCategory;
        filterQuotes(); // Apply filter based on last selected category
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to add a new quote
function addQuote(quoteText, category) {
    const newQuote = { text: quoteText, category: category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories(); // Update categories dropdown
    renderQuotes(quotes);
    filterQuotes(); // Refresh displayed quotes
}

// Populate categories dynamically
function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Render quotes in the DOM
function renderQuotes(quotesToRender) {
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear existing quotes
    quotesToRender.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote.text; // Adjust this based on your quote structure
        quotesContainer.appendChild(quoteElement);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // Render filtered quotes
    renderQuotes(filteredQuotes);
    // Save the last selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Display a random quote
function displayRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex].text; // Assuming each quote has a 'text' property
        document.getElementById('quoteDisplay').textContent = randomQuote; // Display the random quote
    } else {
        document.getElementById('quoteDisplay').textContent = 'No quotes available.';
    }
}

// Function to export quotes to JSON
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Update local storage
        alert('Quotes imported successfully!');
        renderQuotes(quotes); // Render newly imported quotes in the DOM
        populateCategories(); // Update category options
        filterQuotes(); // Apply filter based on last selected category
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    displayRandomQuote(); // Display a random quote on load
});
document.getElementById('exportButton').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('randomQuoteButton').addEventListener('click', displayRandomQuote); // Button for random quote
