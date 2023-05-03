import axios from 'axios';

//select dom elements
export const searchForm = document.querySelector('#search');
const searchInputText = document.querySelector('#search-input-text');
export const searchBtn = document.querySelector('#search-btn');
const booksList = document.querySelector('#books-list');
const modalInfoBook = document.querySelector('#modal-info-book');
const searchType = document.querySelector('#search-type');
let closeModal;



// initialize empty array to store books
let books = [];

// function to retrieve books from open library
export function findBook() {
  
  let url = '';
  if (searchType.value === 'subject') {
    url = `http://openlibrary.org/subjects/${searchInputText.value.trim()}.json`;
  } else if (searchType.value === 'title') {
    url = `http://openlibrary.org/search.json?title=${searchInputText.value.trim()}`;
  }

  books = [];
  const config = {
    headers: {
      Accept: 'application/json'
    }
  };

  axios
    .get(url, config)
    .then(res => {
      
      if (searchType.value === 'subject') {
        books = books.concat(res.data.works);
      } else if (searchType.value === 'title') {
        books = books.concat(res.data.docs);
        console.log(books);
      }
      renderBookList(books);
    })
    .catch(err => {
      console.log(err);
    });
}


// function to render book list
function renderBookList(books){
  let html = '';
  booksList.innerHTML = '';
  books.forEach((book) =>{
   html += createBookPreview(book)
})

  booksList.innerHTML = html;
  addBookEventListeners();
}

// function to create book preview html
function createBookPreview(book) {
  let authorName;
  let bookKey;
  let bookCoverId;
  let bookTitle;
  if (searchType.value === 'subject') {
    authorName = book.authors[0].name;
    bookTitle = book.title;
    bookCoverId = book.cover_id;
    bookKey = book.key;
  } else if (searchType.value === 'title') {
    authorName = book.author_name;
    bookTitle = book.title;
    bookCoverId = book.cover_i;
    bookKey = book.key;
  }
  return `<div class="book-preview" data-book-id="${bookKey}" data-author-name="${authorName}">
    <figure>
      <img src="https://covers.openlibrary.org/b/id/${bookCoverId}-L.jpg" alt="${bookTitle}" class="preview-pic">
    </figure>
    <div class="book-title">${bookTitle}</div>
    <div class="book-author">${authorName}</div>
  </div>`
}

// function to add event listeners to book previews
function addBookEventListeners() {
  let booksListElement = document.querySelectorAll('.book-preview');
  booksListElement.forEach(book => {
    book.addEventListener('click', () => {
      const bookId = book.dataset.bookId;
      const authorName = book.dataset.authorName;
      axios.get(`https://openlibrary.org${bookId}.json`)
        .then(res => {
          const bookData = res.data;
          // controllo description
          if(typeof bookData.description === 'object'){
            bookData.description = bookData.description.value;
          }
          console.log(bookData);
          modalInfoBook.querySelector('.modal-title').textContent = bookData.title;
          modalInfoBook.querySelector('.modal-author').textContent = `By ${authorName}`;
          modalInfoBook.querySelector('.modal-description').textContent = bookData.description || 'No description available';
          modalInfoBook.querySelector('.modal-img').src = bookData.covers && bookData.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg` : '';
          modalInfoBook.style.display = 'flex';
          closeModal = document.querySelector('#close-modal');
          closeModal.addEventListener('click', () => {
            modalInfoBook.style.display = 'none';
          });
        })
        .catch(err => {
          console.log(err)
        });
    });
  });
}
