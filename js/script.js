const API_KEY = "7f040a3b-2c46-4b61-a7f9-7726d3d1a082";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

getMovies(API_URL_POPULAR);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function showMovies(data) {
  const moviesEl = document.querySelector(".section-movies");

  data.films.forEach((movie) => {
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
            <div class="movie__genre">${movie.genres[0].genre}</div>
          </div>
          <div class="movie__rating movie__rating-green">${movie.rating}</div>
          <div class="movie-rate__wrapper">
            <button href="#" class="heart"></button>
          </div>
        </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}
