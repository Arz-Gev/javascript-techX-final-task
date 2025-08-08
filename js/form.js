const sortFilterForm = document.getElementById("filterSorting");

let searchButton = document.getElementById("searchButton");
let searchButtonDiabaled = false;

const searchButtonPosition = document.getElementById("search-position");

if (searchButtonDiabaled) {
  searchButton.disabled = true;
} else {
  searchButton.disabled = false;
}

CreateGenres();

function openClose(pointerId, containerId, show) {
  const pointer = document.getElementById(pointerId);

  pointer.classList.toggle("open");

  const container = document.getElementById(containerId);
  container.classList.toggle(show);
}

function openClose2(
  pointerId,
  pressedButton,
  selected,
  containerId,
  displayContainer
) {
  const pointer = document.getElementById(pointerId);
  pointer.classList.toggle("open");

  const button = document.getElementById(pressedButton);
  button.classList.toggle(selected);

  const options = document.getElementById(containerId);
  options.classList.toggle(displayContainer);
}

const observerSearchButton = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (searchButtonDiabaled) return;
      if (!entry.isIntersecting) {
        searchButton.classList.add("out-of-view");
      } else {
        searchButton.classList.remove("out-of-view");
      }
    });
  },
  {
    root: null,
    rootMargin: "-10px",
    threshold: 0,
  }
);

observerSearchButton.observe(searchButtonPosition);

document.getElementById("releases").addEventListener("change", (e) => {
  document
    .getElementById("hiddenCheckboxes")
    .classList.toggle("show-checkboxes");
});

async function CreateGenres() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(data);
    let id = 0;
    data.genres.forEach((genre) => {
      createGenre(genre, id);
      id++;
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

function createGenre(genre, iD) {
  const container = document.getElementById("genresContainer");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.display = "none";
  checkbox.id = genre.name;
  checkbox.name = iD;
  checkbox.value = genre.id;
  checkbox.checked = false;

  const label = document.createElement("label");
  label.className = "Genres-label";
  label.htmlFor = genre.name;
  label.textContent = genre.name;

  container.appendChild(checkbox);
  container.appendChild(label);
}

document
  .getElementById("genresContainer")
  .addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
      const label = document.querySelector(`label[for="${e.target.id}"]`);
      label.classList.toggle("checked");
    }
  });

const sortOptions = document.getElementById("options");

sortOptions.addEventListener("click", function (e) {
  if (e.target.className === "sort-option") {
    document.getElementById("selectedSortOption").textContent =
      e.target.textContent;
    formData.sortBy = e.target.id;
    sortOptions.classList.toggle("displayOptions");
  }
});

searchButton.addEventListener("click", () => {
  const container = document.getElementById("moviesContainer");
  const childrenToDelete = container.querySelectorAll(":not(#movieCard)");
  childrenToDelete.forEach((child) => child.remove());

  const SFData = new FormData(sortFilterForm);
  const data = Object.fromEntries(SFData);

  formData.genres = "";

  for (let i = 0; i < 19; i++) {
    if (formData.genres === "") {
      formData.genres = data[i] ? data[i] : "";
    } else {
      formData.genres = data[i]
        ? formData.genres + "," + data[i]
        : formData.genres + "";
    }
  }

  console.log(formData.genres);

  currentPage = 1;
  loadMovies(currentPage);
});
