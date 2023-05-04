import axios from 'axios';
import { searchInputText, modalInfoBook, searchType, SUBJECT_URL, TITLE_URL, defaultImageUrl } from './globals.js';
import { showResults, showNetworkMessage } from './render.js';
let closeModal;
// initialize an empty array to store books
let books = [];

// function to find books on open library
export function findBook() {
  let url = '';
  let searchInputTextValue = searchInputText.value.trim().toLowerCase();
  // determine the url based on the selected search type
  if (searchType.value === 'subject') {
    url = `${SUBJECT_URL}/${searchInputTextValue}.json`;
  } else if (searchType.value === 'title') {
    url = `${TITLE_URL}?title=${searchInputTextValue}`;
  }

  // reset the books array
  books = [];

  // set up http request options
  const config = {
    headers: {
      Accept: 'application/json'
    }
  };

  // send the http request
  axios
    .get(url, config)
    .then(res => {
      // add books to the array based on the selected search type
      if (searchType.value === 'subject') {
        books = books.concat(res.data.works);
      } else if (searchType.value === 'title') {
        books = books.concat(res.data.docs);
      }

      // show results on the page
      showResults(books);
    })
    .catch(err => {
      console.log(err);
      showNetworkMessage();
    });
}

// function to add event listeners to book previews
export function addBookEventListeners() {
  let booksListElement = document.querySelectorAll('.book-preview');
  booksListElement.forEach(book => {
    book.addEventListener('click', () => {
      const bookId = book.dataset.bookId;
      const authorName = book.dataset.authorName;
      // send a request to get the book data
      axios.get(`https://openlibrary.org${bookId}.json`)
        .then(res => {
          const bookData = res.data;
          // check description
          checkDescription(bookData);
          // update modal with book info
          updateModal(bookData, authorName);

          // add event listenere to close modal when clicked
          closeModal = document.querySelector('#close-modal');
          closeModal.addEventListener('click', hideModal);
        })
        .catch(err => {
          console.log(err)
          showNetworkMessage();
        });
    });
  });
}



// hide the modal
function hideModal(){
  modalInfoBook.style.display = 'none';
}

// check if description exist
function checkDescription(bookData){
  if (typeof bookData.description === 'object') {
    bookData.description = bookData.description.value;
  }
}

// update the modal with book info
function updateModal(bookData, authorName){
  modalInfoBook.querySelector('.modal-title').textContent = bookData.title;
  modalInfoBook.querySelector('.modal-author').textContent = `By ${authorName}`;
  modalInfoBook.querySelector('.modal-description').textContent = bookData.description || 'No description available';
  modalInfoBook.querySelector('.modal-img').src = bookData.covers ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg` : defaultImageUrl;
  modalInfoBook.style.display = 'flex';
}