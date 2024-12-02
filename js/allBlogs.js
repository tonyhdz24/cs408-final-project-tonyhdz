window.onload = loaded();
const blogsContainer = document.getElementById("main-content");
const searchBtn = document.getElementById("filter_btn");
const authorFilter = document.getElementById("filter_author-name");
const tagFilter = document.getElementById("filter_tag");

// Handle search button
searchBtn.onclick = search;

function search(e) {
  e.preventDefault();

  loadSelectBlogs(authorFilter.value, tagFilter.value);
}

// Function to load all blogs when the page loads
function loaded() {
  loadAllBlogs();
}

/**
 * Function to load all blogs from the database and display them in the table
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
 * Function to load Select blogs from the database and display them in the table
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
      console.log("BLOG => " + blog.author + "Author: " + author);
      if (blog.author == author || blog.tag == tag) {
        console.log("BLOG => " + blog.author);
        filteredBlogs.push(blog);
      }
    });

    filteredBlogs.forEach((blog) => {
      console.log("FILTEREDBLOG => " + blog.author);
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
