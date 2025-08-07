formData = {};

let searchButtonDiabaled = true;
let searchButton = document.getElementById("searchButton");
const searchButtonPosition = document.getElementById("search-position");
if (searchButtonDiabaled) {
  searchButton.disabled = true;
} else {
  searchButton.disabled = false;
}

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
