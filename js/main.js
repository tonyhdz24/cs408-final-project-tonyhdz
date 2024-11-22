//* Selecting DOM Elements
const btnFilter = document.getElementById("btn-filter");
const dropDownContainer = document.querySelector(".filter-dropdown");
// NewBlog page elements
const addNewBlogBTN = document.getElementById("addNewBlogBTN");
const blogTitle = document.getElementById("blog-title");
const blogAuthor = document.getElementById("blog-author");
const blogTag = document.getElementById("blog-tag");
const blogText = document.getElementById("blog-text");

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

// C.R.U.D Functions :3
function addNewBlog() {
  // Getting form inputs
  console.log("Adding new blog 😽");
  let xhr = new XMLHttpRequest();
  xhr.open(
    "PUT",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  // Send item details from inputs as a JSON string
  xhr.send(
    JSON.stringify({
      id: blogTitle.value,
      author: blogAuthor.value,
      tag: blogTag.value,
      text: blogText.value,
    })
  );
}

// Add a new blog event handler
addNewBlogBTN.onclick = () => {
  addNewBlog();
};
