const moviesContainer = document.getElementById("moviesContainer");
const movieCardTemplate = document.getElementById("movieCard");
const loadMore = document.getElementById("load-more");
let loadPressed = false;
let movies = {};
let currentPage = 1;

const options = {
  root: null,
  rootMargin: "0px 0px 300px 0px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && loadPressed) {
        loadMore.click();
      }
    });
  },
  {
    root: null,
    rootMargin: "0px 0px 300px 0px",
    threshold: 0,
  }
);

observer.observe(loadMore);

loadMovies(1);

loadMore.addEventListener("click", () => {
  currentPage++;
  loadMovies(currentPage);
  loadPressed = true;
});

async function loadMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWYyMzdlNTRlMDRmZDA1MzA1MzFiNTlmZjhiMGU5NyIsIm5iZiI6MTc1NDQ3MDY4MC45ODcsInN1YiI6IjY4OTMxOTE4ZDEyMDM4NmY4OTExZTU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2FrPJi5tejPIImPSnJ-y4elVjTulWOID_FTAdlSdNs",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    data.results.forEach((movie) => {
      console.log(movie);
      createMovieCard(movie);
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

function createMovieCard(movie) {
  const cardClone = movieCardTemplate.cloneNode(true);

  const movieRating = Math.round(movie.vote_average * 10);

  cardClone.querySelector("#movieName").textContent = movie.title;

  cardClone.querySelector("#movieReleseDate").textContent = new Date(
    movie.release_date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  cardClone.querySelector(
    "#moviePoster"
  ).src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  cardClone.querySelector("#percentValue").childNodes[0].nodeValue =
    movieRating;

  cardClone.querySelector("#percentVisual").style.background = `conic-gradient(
  rgba(var(--percent-color-medium), 1) ${movieRating}%,${movieRating}%,
  rgba(var(--percent-color-medium), 0.3) 100%)`;

  moviesContainer.appendChild(cardClone);
  cardClone.style.display = "flex";
}
