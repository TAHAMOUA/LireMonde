const api = "http://localhost:3000/books";

let books = [];
let editId = null;
let currentPage = localStorage.getItem("activePage") || "Accueil";

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
const closeModalBtn = document.getElementById("closeModal");

const aLireBooks = document.getElementById("aLireBooks");

const adminTable = document.getElementById("adminTable");
const addBookBtn = document.getElementById("addBookBtn");

const formModal = document.getElementById("formModal");
const closeFormBtn = document.getElementById("closeForm");
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
    renderPages();
  } catch (error) {
    console.log("Erreur :", error);
  }
}

function showBooks(list) {
  booksDiv.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let book = list[i];

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<img src='" + book.couverture + "' alt=''>" +
      "<h3>" + book.titre + "</h3>" +
      "<p>" + book.auteur + "</p>" +
      "<p>" + book.genre + "</p>";

    card.addEventListener("click", function () {
      openModal(book);
    });

    booksDiv.appendChild(card);
  }
}

function showFilters() {
  filtersDiv.innerHTML = "";

  let genres = ["Tous"];

  for (let i = 0; i < books.length; i++) {
    if (!genres.includes(books[i].genre)) {
      genres.push(books[i].genre);
    }
  }

  for (let i = 0; i < genres.length; i++) {
    let btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = genres[i];

    btn.addEventListener("click", function () {
      if (genres[i] === "Tous") {
        showBooks(books);
      } else {
        let result = books.filter(function (book) {
          return book.genre === genres[i];
        });
        showBooks(result);
      }
    });

    filtersDiv.appendChild(btn);
  }
}

searchInput.addEventListener("input", function () {
  let value = searchInput.value.toLowerCase().trim();

  if (value === "") {
    showBooks(books);
    return;
  }

  let result = books.filter(function (book) {
    let title = book.titre.toLowerCase().trim();
    return title.includes(value);
  });

  showBooks(result);
});

function openModal(book) {
  let textButton = "Ajouter à lire";

  if (book.aLire === true) {
    textButton = "Retirer de la liste";
  }

  modalContent.innerHTML =
    "<div class='modal-content-flex'>" +
      "<img class='modal-image' src='" + book.couverture + "' alt=''>" +
      "<div class='modal-info'>" +
        "<h2>" + book.titre + "</h2>" +
        "<p>" + book.auteur + "</p>" +
        "<p>" + book.genre + "</p>" +
        "<p>" + book.description + "</p>" +
        "<button id='toggleBtn' type ='button'>" + textButton + "</button>" +
      "</div>" +
    "</div>";

  modal.classList.remove("hidden");

  document.getElementById("toggleBtn").addEventListener("click", function () {
    toggleLire(book);
  });
}

closeModalBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

async function toggleLire(book) {
  try {
    await fetch(api + "/" + book.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        aLire: !book.aLire
      })
    });

    modal.classList.add("hidden");
    getBooks();
  } catch (error) {
    console.log("Erreur :", error);
  }
}

function showALire() {
  aLireBooks.innerHTML = "";

  let list = books.filter(function (book) {
    return book.aLire === true;
  });

  for (let i = 0; i < list.length; i++) {
    let book = list[i];

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<img src='" + book.couverture + "' alt=''>" +
      "<h3>" + book.titre + "</h3>" +
      "<p>" + book.auteur + "</p>" +
      "<button class='removeBtn' type ='button'>Retirer</button>";

    card.querySelector(".removeBtn").addEventListener("click", function () {
      toggleLire(book);
    });

    aLireBooks.appendChild(card);
  }
}

function showAdmin() {
  adminTable.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    let tr = document.createElement("tr");

    tr.innerHTML =
      "<td><img src='" + book.couverture + "'></td>" +
      "<td>" + book.titre + "</td>" +
      "<td>" + book.auteur + "</td>" +
      "<td>" + book.genre + "</td>" +
      "<td>" +
      "<button class='editBtn' type ='button'>Modifier</button> " +
      "<button class='deleteBtn' type ='button'>Supprimer</button>" +
      "</td>";

    let editBtn = tr.querySelector(".editBtn");
    let deleteBtn = tr.querySelector(".deleteBtn");

    editBtn.addEventListener("click", function () {
      openForm(book);
    });

    deleteBtn.addEventListener("click", function () {
      deleteBook(book.id);
    });

    adminTable.appendChild(tr);
  }
}

btnAccueil.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage = "Accueil"; 
  renderPages();
});

btnALire.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage = "ALire"; 
  renderPages();
});

btnAdmin.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage = "Admin"; 
  renderPages();
});

function renderPages() {
  pageAccueil.classList.add("hidden");
  pageALire.classList.add("hidden");
  pageAdmin.classList.add("hidden");

  searchInput.classList.add("hidden");

  if (currentPage === "Accueil") {
    pageAccueil.classList.remove("hidden");
    searchInput.classList.remove("hidden"); 
  } else if (currentPage === "ALire") {
    pageALire.classList.remove("hidden");
    searchInput.value = ""; 
    showBooks(books);
  } else if (currentPage === "Admin") {
    pageAdmin.classList.remove("hidden");
    
    searchInput.value = ""; 
    showBooks(books);
  }
  localStorage.setItem("activePage", currentPage);
}
addBookBtn.addEventListener("click", function () {
  editId = null;
  bookForm.reset();
  formModal.classList.remove("hidden");
});
closeFormBtn.addEventListener("click", function(){
    formModal.classList.add("hidden");
});
bookForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newBook = {
    titre: titre.value,
    auteur: auteur.value,
    genre: genre.value,
    couverture: couverture.value,
    description: description.value,
    aLire: editId === null ? false : books.find(book => book.id === editId).aLire
  };

  try {
    if (editId === null) {
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });
    } else {
      await fetch(api + "/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });
    }

    formModal.classList.add("hidden");
    bookForm.reset();
    getBooks();
  } catch (error) {
    console.log("Erreur :", error);
  }
});

function openForm(book){
    editId = book.id;
    titre.value = book.titre;
    auteur.value = book.auteur;
    genre.value = book.genre;
    couverture.value = book.couverture;
    description.value = book.description;

    formModal.classList.remove("hidden");
}

async function deleteBook(id) {
  let confirmation = confirm("Voulez-vous vraiment supprimer ce livre ?");
  if (confirmation === true) {
    try {
      await fetch(api + "/" + id, {
        method: "DELETE"
      });
      getBooks(); 
    } catch (error) {
      console.log("Erreur :", error);
    }
  }
}

getBooks();