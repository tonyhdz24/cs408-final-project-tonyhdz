//* Selecting DOM Elements
const btnFilter = document.getElementById("btn-filter");
const dropDownContainer = document.querySelector(".filter-dropdown");

// On All Blogs page load, loads all blogs
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  console.log(path);
  if (path === "/pages/allBlogs.html") {
    // Action for page1.html
    console.log("Page 1 loaded :3");
    // Your specific action for Page 1
  }
});

// Enables filter dropdown functionality
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

