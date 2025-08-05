let menuOpen = false;

function showMenu() {
  const mobileMenu = document.querySelector(".header-content");
  if (menuOpen) {
    mobileMenu.classList.remove("show");
    menuOpen = false;
  } else {
    mobileMenu.classList.add("show");
    menuOpen = true;
  }
}

function displayDropdown(str) {
  const dropDownContent = document.querySelector("." + str);
  const displayed = window.getComputedStyle(dropDownContent).display;
  if (displayed === "block") {
    dropDownContent.style.display = "none";
  } else {
    dropDownContent.style.display = "block";
  }
}
