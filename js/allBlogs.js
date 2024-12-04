/**
 * Initializes the blog page by loading all blogs.
 * This function listens for the `DOMContentLoaded` event to ensure that the DOM is fully loaded
 * before proceeding with loading the blogs.
 */

window.onload = loaded();
const blogsContainer = document.getElementById("main-content");
const searchBtn = document.getElementById("filter_btn");
const authorFilter = document.getElementById("filter_author-name");
const tagFilter = document.getElementById("filter_tag");

// Handle search button
searchBtn.onclick = search;
/**
 * Handles the search functionality to filter blogs by author or tag.
 * When the search button is clicked, this function retrieves the values from the
 * filter input fields and loads the filtered blogs.
 *
 * @param {Event} e The event object associated with the search button click.
 */
function search(e) {
  e.preventDefault();

  loadSelectBlogs(authorFilter.value, tagFilter.value);
}

/**
 * Loads all blogs from the database and displays them in the container.
 * This function makes a GET request to the backend to fetch all blogs,
 * then it parses the response and creates HTML elements to display them.
 */
function loaded() {
  loadAllBlogs();
}

/**
 * Loads all blogs from the database and displays them in the main content section.
 * This function sends a GET request to the backend and populates the page with the blog data.
 */
function loadAllBlogs() {
  console.log("Load All Blogs .....");
  let xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

  xhr.addEventListener("load", function () {
    blogsContainer.innerHTML = "";
    const blogs = JSON.parse(xhr.response); // Parse response JSON to get blogs

    blogs.forEach((blog) => {
      // Limit the blog text to 100 characters
      const previewText =
        blog.text.length > 450 ? blog.text.slice(0, 450) + "..." : blog.text;
      // For each item in database create a new blog article to add to page
      const newArticle = document.createElement("article");

      newArticle.innerHTML = `
      <header>
      <h3 class="blog-sample_title">${blog.title}</h3>
      <div class="blog-sample_title_details">
      <h4>By: ${blog.author}</h4>
      <h4 class="tag">Tag: ${blog.tag}</h4>
      </div>
      </header>
          <p class="blog-sample_text">
          ${previewText}
          </p>
          <button class="blog-sample_link">
            <a href="./singleBlog.html?blogId=${blog.blogId}"> View Blog </a>
          </button>`;

      // Add the new row to the table before last row
      const lastElement = blogsContainer.lastElementChild;
      blogsContainer.insertBefore(newArticle, lastElement);
    });
  });
  xhr.open(
    "GET",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs"
  );
  xhr.send();
}
/**
 * Loads filtered blogs based on the provided author name or tag.
 * This function sends a GET request to the backend, filters the results based on the
 * input parameters, and then updates the page to display the filtered blogs.
 *
 * @param {string} author The author name to filter blogs by.
 * @param {string} tag The tag to filter blogs by.
 */
function loadSelectBlogs(author, tag) {
  console.log("Loading Select Blogs .....");
  let xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

  xhr.addEventListener("load", function () {
    blogsContainer.innerHTML = "";
    // Get all Blogs
    const blogs = JSON.parse(xhr.response); // Parse response JSON to get blogs

    // Filter Blogs
    let filteredBlogs = new Array();
    blogs.forEach((blog) => {
      if (
        blog.author.toLowerCase() == author.toLowerCase() ||
        blog.tag.toLowerCase() == tag.toLowerCase()
      ) {
        filteredBlogs.push(blog);
      }
    });

    filteredBlogs.forEach((blog) => {
      // Limit the blog text to 100 characters
      const previewText =
        blog.text.length > 450 ? blog.text.slice(0, 450) + "..." : blog.text;
      // For each item in database create a new blog article to add to page
      const newArticle = document.createElement("article");

      newArticle.innerHTML = `
      <header>
      <h3 class="blog-sample_title">${blog.title}</h3>
      <div class="blog-sample_title_details">
      <h4>By: ${blog.author}</h4>
      <h4 class="tag">Tag: ${blog.tag}</h4>
      </div>
      </header>
          <p class="blog-sample_text">
          ${previewText}
          </p>
          <button class="blog-sample_link">
            <a href="./singleBlog.html?blogId=${blog.blogId}"> View Blog </a>
          </button>`;

      // Add the new row to the table before last row
      const lastElement = blogsContainer.lastElementChild;
      blogsContainer.insertBefore(newArticle, lastElement);
    });
  });
  xhr.open(
    "GET",
    "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs"
  );
  xhr.send();
  hideFilterDropdown();
}

//* Selecting DOM Elements
const btnFilter = document.getElementById("btn-filter");
const dropDownContainer = document.querySelector(".filter-dropdown");

/**
 * Shows the filter dropdown menu.
 * This function makes the filter options visible for the user to select.
 */
function showFilterDropdown() {
  dropDownContainer.classList.add("visible");
}
/**
 * Hides the filter dropdown menu.
 * This function hides the filter options when the user clicks outside the dropdown.
 */
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
// Event listener to close the dropdown when pressing the "Escape" key
document.onkeydown = (e) => {
  var keyPressed = e.key;
  if (keyPressed == "Escape") {
    hideFilterDropdown();
  }
};
