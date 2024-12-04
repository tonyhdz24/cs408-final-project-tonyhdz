/**
 * Handles the page load event to retrieve the `blogId` from the URL and load the corresponding blog.
 * If the `blogId` is found in the URL, it loads the blog details. Otherwise, it displays an error message.
 */
window.onload = function () {
  const blogId = new URLSearchParams(window.location.search).get("blogId"); // Get blogId from URL

  console.log(blogId);

  if (blogId) {
    loadSingleBlog(blogId);
  } else {
    document.getElementById("main-content").innerHTML =
      "<p>Blog not found.</p>";
  }
};
/**
 * Loads a single blog post by its ID from the backend and displays it in the content section.
 * This function sends a GET request to retrieve the blog post data, and if the blog is found,
 * it displays the blog's title, author, text, and tag, as well as a delete button.
 *
 * @param {string} blogId The ID of the blog post to retrieve.
 */
function loadSingleBlog(blogId) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function () {
    const blog = JSON.parse(xhr.response); // Parse response JSON to get the blog

    if (blog) {
      const blogContent = `
          <h2>${blog.title}</h2>
          <h4>by ${blog.author}</h4>
          <p>${blog.text}</p>
          <p><strong>Tag:</strong> ${blog.tag || "No tag"}</p>
          <button id="btn-delete" class="btn-Delete">Delete</button>
        `;

      document.getElementById("main-content").innerHTML = blogContent;

      // Add event listener to the delete button
      document
        .getElementById("btn-delete")
        .addEventListener("click", function () {
          deletePost(blogId);
        });
    } else {
      document.getElementById("main-content").innerHTML =
        "<p>Blog not found.</p>";
    }
  });

  xhr.open(
    "GET",
    `https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs/${blogId}`
  );
  xhr.send();
}

/**
 * Deletes a blog post by its ID.
 * This function sends a DELETE request to the backend to delete the blog post. If successful,
 * the page is redirected to the "allBlogs.html" page.
 *
 * @param {string} blogId The ID of the blog post to delete.
 */
function deletePost(blogId) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      console.log(`Post with ID ${blogId} deleted successfully.`);
      // Redirect to all blogs page after successful deletion
      window.location.href = "allBlogs.html";
    } else {
      console.error(`Failed to delete post with ID ${blogId}.`);
      alert("Error deleting blog. Please try again.");
    }
  });

  xhr.open(
    "DELETE",
    `https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs/${blogId}`
  );
  xhr.send();
}
