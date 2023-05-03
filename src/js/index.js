import { findBook, searchForm } from "./foundBook.js";
import "../styles/main.scss";

findBook();

searchForm.addEventListener("submit", (event)=>{
  event.preventDefault();
  findBook();

  })
