import { findBook } from "./foundBook.js";
import { searchForm } from "./globals.js";
import "../styles/main.scss";

searchForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  findBook();

  })
