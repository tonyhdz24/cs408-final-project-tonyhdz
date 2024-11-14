//* Selecting DOM Elements
const btnFilter = document.getElementById("btn-filter");
const dropDownContainer = document.querySelector(".filter-dropdown");

function showFilterDropdown() {
  dropDownContainer.classList.add("visible");
}
function hideFilterDropdown() {
  dropDownContainer.classList.remove("visible");
}

//* Event Listeners

// Shows Dropdown
btnFilter.onclick = () => {
  showFilterDropdown();
};
// Hides Dropdown
document.onclick = (e) => {
  var elementClicked = e.target;
  // Check if the clicked element is not the dropdown container or a child of it
  if (
    elementClicked !== btnFilter &&
    !dropDownContainer.contains(elementClicked)
  ) {
    hideFilterDropdown();
  }
};

document.onkeydown = (e) => {
  var keyPressed = e.key;
  if (keyPressed == "Escape") {
    hideFilterDropdown();
  }
};
