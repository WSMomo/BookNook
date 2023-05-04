import defaultImage from '../img/default-image.jpg';

// dom elements
export const searchForm = document.querySelector('#search');
export const searchInputText = document.querySelector('#search-input-text');
export const booksList = document.querySelector('#books-list');
export const modalInfoBook = document.querySelector('#modal-info-book');
export const searchType = document.querySelector('#search-type');
export const errorMessage = document.querySelector('#error-message');

// API urls
export const SUBJECT_URL = 'http://openlibrary.org/subjects';
export const TITLE_URL = 'http://openlibrary.org/search.json';

// default image url
export const defaultImageUrl = defaultImage;