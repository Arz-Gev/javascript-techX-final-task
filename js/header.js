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
  const page = window.getComputedStyle(document.querySelector("html"));
  const width = page.width.match(/\d+/);
  const dropDownContent = document.querySelector("." + str);
  const displayed = window.getComputedStyle(dropDownContent).display;

  if (width[0] > 768) {
    return;
  }
  if (displayed === "block") {
    dropDownContent.classList.remove("show-content");
  } else {
    dropDownContent.classList.add("show-content");
  }
}
