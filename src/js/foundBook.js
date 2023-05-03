import axios from 'axios';

//select dom elements
export const searchForm = document.querySelector('#search');
const searchInputText = document.querySelector('#search-input-text');
export const searchBtn = document.querySelector('#search-btn');
const booksList = document.querySelector('#books-list');
const modalInfoBook = document.querySelector('#modal-info-book');
let closeModal;
// initialize empty array to store books
let books = [];

// function to retrieve books from open library
export function findBook(){
  books = [];
  const config = {
    headers: {
      Accept: 'application/json'
    }
  }
  axios
  .get(`http://openlibrary.org/subjects/${searchInputText.value || 'cats'}.json`, config)
  .then(res=>{
    books = books.concat(res.data.works);
    renderBookList(books);

  })
  .catch(err =>{
    console.log(err)
  })

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
  const authorName = book.authors[0].name;
  return `<div class="book-preview" data-book-id="${book.key}" data-author-name="${authorName}">
    <figure>
      <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="${book.title}" class="preview-pic">
    </figure>
    <div class="book-title">${book.title}</div>
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
          modalInfoBook.querySelector('.modal-title').textContent = bookData.title;
          modalInfoBook.querySelector('.modal-author').textContent = `By ${authorName}`;
          modalInfoBook.querySelector('.modal-description').textContent = bookData.description || 'No description available';
          modalInfoBook.querySelector('.modal-img').src = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`;
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
