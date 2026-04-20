"use strict";
const movies = [

  {
    id: 1,
    titel: "Inception",
    genre: "science-fiction",
    year: 2010,
    duration: 2.28,
    img: "img/inception.webp",
    url: "https://www.imdb.com/title/tt1375666/",
  },
  {
    id: 2,
    titel: "The Dark Knight",
    genre: "action",
    year: 2008,
    duration: 2.32,
    img: "img/the-dark-knight.webp",
    url: "https://www.imdb.com/title/tt0468569/",
  },
  {
    id: 3,
    titel: "Forrest Gump",
    genre: "drama",
    year: 1994,
    duration: 2.22,
    img: "img/forrest-gump.webp",
    url: "https://www.imdb.com/title/tt0109830/",
  },
  {
    id: 4,
    titel: "Superbad",
    genre: "comedy",
    year: 2007,
    duration: 1.53,
    img: "img/superbad.webp",
    url: "https://www.imdb.com/title/tt0829482/",
  },
  {
    id: 5,
    titel: "It",
    genre: "horror",
    year: 2017,
    duration: 2.15,
    img: "img/it.webp",
    url: "https://www.imdb.com/title/tt1396484/",
  },
];

// variabler som peger på de oprettede HTML-elementerne

const moviesContainer = document.querySelector("#movies-container");
const selectedCategory = document.querySelector("#category-select");
const searchInput = document.querySelector("#gsearch");
const form = document.querySelector("form");

//funktion oprettes for at kunne vise filmene 
function displayMovies(movieList){
  const html = movieList
    .map((movie) => {
      //Her opbygges et nyt array (liste) med map() baseret på vores movies-array (liste)
      return `
        <article>
         <h2>${movie.titel}</h2>
    <ul>
        <li>Genre: ${movie.genre}</li>
        <li>År: ${movie.year} </li>
        <li>Varighed: ${movie.duration}</li>
    </ul>
    <figure>
        <a href="${movie.url}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.img}" alt="${movie.titel}">
        </a>
        <figcaption>Læs mere på IMDB</figcaption>
    </figure>
        </article>
    `;
    })
    .join(""); //Her samler jeg det hele med join("") til en samlet HTML-streng

  moviesContainer.innerHTML = html;
}
// Her kalder jeg funktionen og sender hele movies-arrayet med ind som argument
displayMovies(movies);

//funktionen til at filtrer filmene oprettes 
function filterMovies() {
const selectedValue = selectedCategory.value;
const searchTerm = searchInput.value.toLowerCase().trim()

let filteredMovies = movies;

if (selectedValue != "All") {
    filteredMovies = filteredMovies.filter((movie)=> {
        return movie.genre === selectedValue;
    }); 
}
if (searchTerm !="" ) {
    filteredMovies = filteredMovies.filter((movie)=> {
    return movie.titel.toLowerCase().includes(searchTerm);    
});

}
displayMovies(filteredMovies);
}

//der sættes addEventListener på variablerne, som lytter efter om værdien i dropdown-menuen ændrer sig og 
// når der sker ændringer i søgefeltet 
selectedCategory.addEventListener("change", filterMovies)
searchInput.addEventListener("input", filterMovies);

//Undgå at siden reloader ved submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  filterMovies();
});