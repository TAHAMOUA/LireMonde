# 📚 LireMonde — Bibliothèque en ligne

**LireMonde** est une application web de gestion de bibliothèque personnelle, développée en HTML, CSS et JavaScript vanille, utilisant `json-server` comme API REST locale.

***

## 🗂️ Structure du projet

```
liremonde/
├── index.html       # Structure principale de la page
├── style.css        # Styles de l'application
├── script.js        # Logique JavaScript (API, DOM, événements)
└── db.json          # Base de données JSON (gérée par json-server)
```

***

## ⚙️ Technologies utilisées

| Technologie      | Rôle                                      |
|------------------|-------------------------------------------|
| HTML5            | Structure sémantique des pages            |
| CSS3             | Mise en page, responsive, modals          |
| JavaScript (ES6) | Logique, fetch, DOM manipulation          |
| json-server      | API REST locale (GET, POST, PUT, PATCH, DELETE) |

***

## 🚀 Lancement du projet

### 1. Installer json-server (si pas encore installé)

```bash
npm install -g json-server
```

### 2. Lancer le serveur API

```bash
json-server --watch db.json --port 3000
```

### 3. Ouvrir l'application

Ouvrir `index.html` dans le navigateur (via Live Server ou directement).

***

## 📋 Fonctionnalités

### 🏠 Page Accueil
- Affichage de tous les livres sous forme de cartes (grille 4 colonnes)
- Filtrage par genre (boutons dynamiques générés depuis les données)
- Recherche en temps réel par titre (`startsWith`)
- Ouverture d'une modal au clic sur une carte

### 📖 Page À lire
- Liste des livres marqués `aLire: true`
- Bouton **Retirer** pour enlever un livre de la liste

### 🔧 Page Admin
- Tableau de tous les livres
- Bouton **Modifier** → ouvre un formulaire pré-rempli
- Bouton **Supprimer** → supprime le livre définitivement
- Bouton **Ajouter un livre** → ouvre un formulaire vide

***

## 🔌 Endpoints API utilisés

| Méthode  | Endpoint         | Action                        |
|----------|------------------|-------------------------------|
| `GET`    | `/books`         | Récupérer tous les livres     |
| `POST`   | `/books`         | Ajouter un nouveau livre      |
| `PUT`    | `/books/:id`     | Modifier un livre (complet)   |
| `PATCH`  | `/books/:id`     | Modifier `aLire` uniquement   |
| `DELETE` | `/books/:id`     | Supprimer un livre            |

***

## 🗄️ Structure d'un livre (`db.json`)

```json
{
  "id": 1,
  "titre": "The Hobbit",
  "auteur": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "couverture": "https://url-image.com/hobbit.jpg",
  "description": "Bilbo Baggins est entraîné dans une aventure extraordinaire.",
  "aLire": true
}
```

***

## 🖼️ Aperçu des pages

| Page      | Description                               |
|-----------|-------------------------------------------|
| Accueil   | Galerie de livres avec filtres et recherche |
| À lire    | Liste de lecture personnelle              |
| Admin     | CRUD complet sur les livres               |

***

## 📝 Commits associés

```
initialisation
add html for pages
test git ignore
Remove node_modules from repository
hide node_modules
add css and style it
edit card and modal in css
add js dom and link server
feat:improve search,modal and admin actions
feat: add search and admin modal fixes
```

***

## 👨‍💻 Auteur

Projet réalisé dans le cadre d'une formation en développement web — Simplon.
