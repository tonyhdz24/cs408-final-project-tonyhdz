window.onload = loaded();
const blogsContainer = document.getElementById("main-content");

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
    const blogs = JSON.parse(xhr.response); // Parse response JSON to get blogs

    blogs.forEach((blog) => {
      // For each item in database create a new blog article to add to page
      const newArticle = document.createElement("article");

      newArticle.innerHTML = `<h3 class="blog-sample_title">${blog.title}</h3>
      <h4>by: ${blog.author}</h4>
          <p class="blog-sample_text">
          ${blog.text}
          </p>
          <button class="blog-sample_link">
            <a href="./singleBlog.html"> View Blog </a>
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
