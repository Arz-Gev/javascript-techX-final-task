formData = {
  sortBy: "popularity.desc",
  genres: "",
  primary_release_date_gte: "",
  primary_release_date_lte: "",
};

const moviesContainer = document.getElementById("moviesContainer");
const movieCardTemplate = document.getElementById("movieCard");
const loadMore = document.getElementById("load-more");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWYyMzdlNTRlMDRmZDA1MzA1MzFiNTlmZjhiMGU5NyIsIm5iZiI6MTc1NDQ3MDY4MC45ODcsInN1YiI6IjY4OTMxOTE4ZDEyMDM4NmY4OTExZTU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2FrPJi5tejPIImPSnJ-y4elVjTulWOID_FTAdlSdNs",
  },
};

let loadPressed = false;
let movies = {};
let currentPage = 1;

const observerLoadMore = new IntersectionObserver(
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

observerLoadMore.observe(loadMore);

loadMovies(1);

loadMore.addEventListener("click", () => {
  currentPage++;
  loadMovies(currentPage);
  loadPressed = true;
});

async function loadMovies(page = 1) {
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${
    formData.primary_release_date_gte ? "&primary_release_date.gte=" : ""
  }${formData.primary_release_date_gte}${
    formData.primary_release_date_lte ? "&primary_release_date.lte=" : ""
  }${formData.primary_release_date_lte}&sort_by=${formData.sortBy}${
    formData.genres ? "&with_genres=" : ""
  }${formData.genres}`;

  //&primary_release_date.gte=2005-01-01&primary_release_date.lte=2005-01-01

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    data.results.forEach((movie) => {
      createMovieCard(movie);
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

function createMovieCard(movie) {
  const cardClone = movieCardTemplate.cloneNode(true);

  const movieRating = Math.round(movie.vote_average * 10);
  const movieRatingCategory =
    movieRating < 45 ? "low" : movieRating > 75 ? "high" : "medium";

  cardClone.querySelector("#movieName").textContent = movie.title;

  cardClone.querySelector("#movieReleseDate").textContent = new Date(
    movie.release_date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  cardClone.querySelector("#moviePoster").src = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/sources/main/default-poster.svg";

  cardClone.querySelector("#percentValue").childNodes[0].nodeValue =
    movieRating;

  cardClone.querySelector("#percentVisual").style.background = `conic-gradient(
  rgba(var(--percent-color-${movieRatingCategory}), 1) ${movieRating}%,${movieRating}%,
  rgba(var(--percent-color-${movieRatingCategory}), 0.3) 100%)`;

  cardClone.querySelector("#movieDescription").textContent = movie.overview;

  moviesContainer.appendChild(cardClone);
  cardClone.style.display = "flex";
  cardClone.id = "";
}
