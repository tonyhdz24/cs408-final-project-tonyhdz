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

function loadSingleBlog(blogId) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function () {
    const blog = JSON.parse(xhr.response); // Parse response JSON to get the blog
    console.log(blog);

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

// Delete Post
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
