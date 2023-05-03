import { findBook, searchForm } from "./foundBook.js";
import "../styles/main.scss";

searchForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  findBook();

  })
