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
