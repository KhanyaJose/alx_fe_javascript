// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Motivation" },
  { text: "The unexamined life is not worth living.", category: "Philosophy" },
];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  const quote = quotes[randomIndex];

  // Update the DOM with the random quote and its category
  quoteDisplay.innerHTML = `<p>${quote.text}</p><p><strong>Category:</strong> ${quote.category}</p>`;
}

// Function to dynamically create the "Add Quote" form
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create input for new quote text
  const newQuoteTextInput = document.createElement('input');
  newQuoteTextInput.id = 'newQuoteText';
  newQuoteTextInput.type = 'text';
  newQuoteTextInput.placeholder = 'Enter a new quote';
  formContainer.appendChild(newQuoteTextInput);

  // Create input for new quote category
  const newQuoteCategoryInput = document.createElement('input');
  newQuoteCategoryInput.id = 'newQuoteCategory';
  newQuoteCategoryInput.type = 'text';
  newQuoteCategoryInput.placeholder = 'Enter quote category';
  formContainer.appendChild(newQuoteCategoryInput);

  // Create button to add a new quote
  const addQuoteButton = document.createElement('button');
  addQuoteButton.textContent = 'Add Quote';
  addQuoteButton.id = 'addQuoteButton';
  formContainer.appendChild(addQuoteButton);

  // Append form to the body
  document.body.appendChild(formContainer);

  // Event listener for adding a new quote
  addQuoteButton.addEventListener('click', addQuote);
}

// Function to add a new quote dynamically
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  // Ensure both fields are filled out
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert('Please fill out both fields.');
    return;
  }

  // Add new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Persist the quotes array to local storage
  localStorage.setItem('quotes', JSON.stringify(quotes));

  // Clear input fields after adding the quote
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Show the newly added quote immediately
  showRandomQuote();
}

// Function to filter quotes by category
function filterQuotes() {
  const filterCategory = document.getElementById('filterCategory').value.trim().toLowerCase();
  const filteredQuotes = quotes.filter(quote => quote.category.toLowerCase().includes(filterCategory));

  const quoteDisplay = document.getElementById('quoteDisplay');
  
  if (filteredQuotes.length > 0) {
    quoteDisplay.innerHTML = filteredQuotes.map(quote => `<p>${quote.text} - <strong>${quote.category}</strong></p>`).join('');
  } else {
    quoteDisplay.innerHTML = '<p>No quotes found for the selected category.</p>';
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuoteButton').addEventListener('click', showRandomQuote);

// Function to initialize the page
function initialize() {
  createAddQuoteForm();  // Create the form on page load
}

// Run initialize on page load
window.onload = initialize;
