//API KEY: 3ebf2082f93b5e096a1cf6ac8f548d72
const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    api_key: "3ebf2082f93b5e096a1cf6ac8f548d72",
    api_url: "https://api.themoviedb.org/3/",
  },
};

//highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
// Show details and configuration
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const showData = await getFromAPI(`tv/${showId}`);
  console.log(showData);
  displayBgimage("show", showData.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            <img
              src=https://image.tmdb.org/t/p/original${showData.poster_path}
              class="card-img-top"
              alt=${showData.name}
            />
          </div>
          <div>
            <h2>${showData.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${Math.round(showData.vote_average * 10) / 10} / 10
            </p>
            <p class="text-muted">Release Date: ${showData.first_air_date}</p>
            <p>
              ${showData.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${showData.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              showData.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                showData.last_episode_to_air.name
              } (${showData.last_episode_to_air.air_date})
            </li>
            <li><span class="text-secondary">Status:</span> ${
              showData.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${showData.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>`;

  const showDetails = document.getElementById("show-details");
  showDetails.appendChild(div);
}
// Movie Details and configuration
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  //background image

  const movieData = await getFromAPI(`movie/${movieId}`);
  displayBgimage("movie", movieData.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
          <div>
            <img
              src=https://image.tmdb.org/t/p/original${movieData.poster_path}
              class="card-img-top"
              alt=${movieData.title}
            />
          </div>
          <div>
            <h2>${movieData.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${Math.round(movieData.vote_average * 10) / 10} / 10
            </p>
            <p class="text-muted">Release Date: ${movieData.release_date}</p>
            <p>
              ${movieData.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movieData.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addComasToNumbers(
              movieData.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addComasToNumbers(
              movieData.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieData.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movieData.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div  class="list-group">
          
          
          ${movieData.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}
          
          </div>
        </div>`;
  const movieDetails = document.getElementById("movie-details");
  movieDetails.appendChild(div);
}

//display movies

async function displayMovies() {
  const results = await getFromAPI("movie/popular");

  const movieCard = document.getElementById("popular-movies");
  results.results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `  
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img
              src=https://image.tmdb.org/t/p/original${movie.poster_path}
              class="card-img-top"
              alt=${movie.title}
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
  `;
    movieCard.appendChild(div);
  });
}

//addcomas to number
function addComasToNumbers(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//display tv shows

async function displayShows() {
  const results = await getFromAPI("/tv/popular");
  console.log(results.results);
  const tvCard = document.getElementById("popular-shows");
  results.results.forEach((tvShow) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<a href="tv-details.html?id=${tvShow.id}">
    ${
      tvShow.poster_path
        ? `<img
              src=https://image.tmdb.org/t/p/original${tvShow.poster_path}
              class="card-img-top"
              alt=${tvShow.name}
            />`
        : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${tvShow.name}
            />`
    }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tvShow.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${tvShow.first_air_date}</small>
            </p>
          </div>`;
    tvCard.appendChild(div);
  });
}

//fetch API data

async function getFromAPI(endpoint) {
  const API_key = global.api.api_key;
  const API_url = global.api.api_url;
  showSpinner();
  const response = await fetch(
    `${API_url}${endpoint}?api_key=${API_key}&language=en-us`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

//initApp
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayMovies();
      displaySlider();

      break;
    case "/shows.html":
      displayShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      search();
      availablePlatforms();
      break;
    default:
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);

//showSpinner

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

//hideSpinner

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//display bg image

function displayBgimage(type, bgPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(
    https://image.tmdb.org/t/p/original${bgPath})`;

  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";
  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

//display slider movies

async function displaySlider() {
  const { results } = await getFromAPI("movie/now_playing");
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
    <a href="movie-details.html?id=${result.id}">
              <img src="https://image.tmdb.org/t/p/w500${
                result.poster_path
              }" alt="${result.original_title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${
                Math.round(result.vote_average * 10) / 10
              } / 10
            </h4>
    `;
    const swiper_wrapper = document.querySelector(".swiper-wrapper");
    swiper_wrapper.appendChild(div);
    initSwiper();
  });
}

//swiper initialization
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//search page
async function search() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  if ((global.search.term !== "") & (global.search.term !== null)) {
    const { results, total_pages, page, total_results } = await searchApiData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    } else {
      displaySearchResults(results);
    }
  } else {
    showAlert("Please Enter a search term", "error");
  }
}
// Show error alerts
function showAlert(message, className = "error") {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", className);
  alertDiv.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}
// search data through api call
async function searchApiData(endpoint) {
  const response = await fetch(
    `${global.api.api_url}search/${global.search.type}?api_key=${global.api.api_key}&language=en-us&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();
  return data;
}

//display search results on page
async function displaySearchResults(searchResults) {
  const search_results = document.getElementById("search-results");
  //clear previous results if any
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  //displaying results
  searchResults.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `  
          <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
              ? `<img
              src=https://image.tmdb.org/t/p/w500/${result.poster_path}
              class="card-img-top"
              alt=${global.search.type === "movie" ? result.title : result.name}
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=${global.search.type === "movie" ? result.title : result.name}
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
  `;
    document.querySelector("#search-results-heading").innerHTML = `
              <h2>${searchResults.length} of ${global.search.totalResults} displayed for '${global.search.term}'</h2>
  `;
    search_results.appendChild(div);
  });
  displayPagination();
}

//pagination function

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>

  `;
  document.getElementById("pagination").appendChild(div);
  //disable prev if page 1
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  //disable next if last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //going to next page

  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });

  //going to previous page
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchApiData();
    displaySearchResults(results);
  });
}

//available on platforms
async function availablePlatforms() {
  const platforms = await fetch(
    `https://api.themoviedb.org/3/tv/changes?api_key=${global.api.api_key}&language=en-us`
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
