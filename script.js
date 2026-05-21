const api = "http://localhost:3000/books";
let books = [];
let editId = null;

const booksDiv = document.getElementById("books");
const filtersDiv = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");

const pageAccueil = document.getElementById("pageAccueil");
const pageALire = document.getElementById("pageALire");
const pageAdmin = document.getElementById("pageAdmin");

const btnAccueil = document.getElementById("btnAccueil");
const btnALire = document.getElementById("btnALire");
const btnAdmin = document.getElementById("btnAdmin");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

const aLireBooks = document.getElementById("aLireBooks");

const adminTable = document.getElementById("adminTable");
const addBookBtn = document.getElementById("addBookBtn");

const formModal = document.getElementById("formModal");
const closeForm = document.getElementById("closeForm");
const bookForm = document.getElementById("bookForm");

const titre = document.getElementById("titre");
const auteur = document.getElementById("auteur");
const genre = document.getElementById("genre");
const couverture = document.getElementById("couverture");
const description = document.getElementById("description");

async function getBooks() {
  try {
    const response = await fetch(api);
    books = await response.json();
    showBooks(books);
    showFilters();
    showALire();
    showAdmin();
  } catch (error) {
    console.log(error);
  }
}
