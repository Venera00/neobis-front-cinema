const form = document.querySelector("form");
const searchInput = document.querySelector(".header__search");
const premiere = document.querySelector(".premiere");
const topWaited = document.querySelector(".top-waited");
const topBest = document.querySelector(".top-best");
const releaseOfMonth = document.querySelector(".release");

const date = new Date();
const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
const year = date.getFullYear();
console.log(month);
console.log(year);

const API_KEY = "7f040a3b-2c46-4b61-a7f9-7726d3d1a082";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`;
const API_WAITED =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_RELEASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}&page=1`;

getMovies(API_URL_POPULAR);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log("API Response Data:", respData);
  showMovies(respData);
}

function getByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".section-movies");

  moviesEl.innerHTML = "";

  let filmsArray = data.films;
  if (filmsArray && data.results) {
    films.Array = data.results;
  } else if (!filmsArray && data.items) {
    filmsArray = data.items;
  } else if (!filmsArray && data.releases) {
    filmsArray = data.releases;
  }

  if (filmsArray && Array.isArray(filmsArray)) {
    filmsArray.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie-wrapper");
      movieEl.innerHTML = `
        <img
              src="${movie.posterUrlPreview}"
              alt="${movie.nameRu}"
              class="movie__img"
            />
            <div class="movie-info__wrapper">
              <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__year">${movie.year}</div>
                <div class="movie__genre">${movie.genres[0]?.genre}</div>
              </div>
              ${
                movie.rating != null
                  ? `
              <div class="movie__rating movie__rating-${getByRate(
                movie.rating
              )}">${movie.rating}
              </div> 
              `
                  : ""
              }
    
              <div class="movie-rate__wrapper">
                <button href="#" class="heart"></button>
              </div>
            </div>
        `;
      moviesEl.appendChild(movieEl);
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchUrl = `${API_URL_SEARCH}${searchInput.value}`;
  if (searchInput.value) {
    getMovies(searchUrl);

    searchInput.value = "";
  }
});

premiere.addEventListener("click", (e) => {
  e.preventDefault();

  getMovies(API_PREMIERES);
});

topWaited.addEventListener("click", (e) => {
  e.preventDefault();

  getMovies(API_WAITED);
});

topBest.addEventListener("click", (e) => {
  e.preventDefault();

  getMovies(API_URL_POPULAR);
});

releaseOfMonth.addEventListener("click", (e) => {
  e.preventDefault();

  getMovies(API_RELEASES);
});
