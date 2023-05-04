import { booksList, errorMessage, searchType } from "./globals.js";
import { addBookEventListeners } from "./foundBook.js";

// function to show search results on the page
export function showResults(books) {
  console.log(books)
  if (books.length > 0) {
    showBooksList();
    renderBookList(books);
  } else {
    hideBooksList();
    showNoBooksErrorMessage();
  }
}
// function to show the list of books on the page
function showBooksList(){
  errorMessage.style.display = "none";
  booksList.style.display = 'grid';
}

// function to hide the list of books from the page
function hideBooksList() {
  booksList.style.display = 'none';
}
// function to show error message on the page if there aren't any books
function showNoBooksErrorMessage() {
  errorMessage.style.display  = 'block';
  errorMessage.innerText = 'Sorry, no books were found.';
}

// function to show error message on the page in case of server or other errors
export function showNetworkMessage(){
  errorMessage.style.display  = 'block';
  errorMessage.innerText = 'Sorry, an error occurred while retrieving the book information. Please try again later or check your network connection.'
}

// function to render the list of books on the page
function renderBookList(books) {
  let html = '';
  booksList.innerHTML = '';
  // create HTML for each book preview and add it to the list
  books.forEach((book) => {
    html += createBookPreview(book)
  })

  booksList.innerHTML = html;
  addBookEventListeners();
}

// function for create HTML for the modal book preview
function createBookPreview(book) {
  const authorName = getAuthorName(book);
  const bookKey = book.key;
  const bookCoverId = getBookCoverId(book);
  const bookTitle = book.title;
  const imageUrl = getBookCoverImageUrl(bookCoverId);

  return `
    <div class="book-preview" data-book-id="${bookKey}" data-author-name="${authorName}">
      <figure>
        <img src="${imageUrl}" alt="${bookTitle}" class="preview-pic">
      </figure>
      <div class="book-title">${bookTitle}</div>
      <div class="book-author">${authorName}</div>
    </div>
  `;
}

// function to get the author name base on the search type
function getAuthorName(book) {
  if (searchType.value === 'subject') {
    return book.authors[0]?.name || 'Unknown Author';
  } else if (searchType.value === 'title') {
    return book.author_name || 'Unknown Author';
  }
}

// function to get the cover based on the search type
function getBookCoverId(book) {
  if (searchType.value === 'subject') {
    return book.cover_id;
  } else if (searchType.value === 'title') {
    return book.cover_i;
  }
}

// function to choose between undefined cover and default cover
function getBookCoverImageUrl(bookCoverId) {
  const imgUrl = `https://covers.openlibrary.org/b/id/${bookCoverId}-L.jpg`;
  const defaultImageUrl = 'https://via.placeholder.com/150';
  return bookCoverId === undefined
    ? defaultImageUrl
    : imgUrl;
}