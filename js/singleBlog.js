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
          <button id="btn-${blog.blogId}" class="btn-Delete">
          <a href="allBlogs.html">Delete</a></button>    
        `;

      document.getElementById("main-content").innerHTML = blogContent;
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
  //   Adding eventlistener
  const btnDelete = document.getElementById(`btn-${blogId}`);
  btnDelete.onclick = deletePost;
}

// Delete Post

function deletePost() {
  console.log(`Deleting post ${this}`);
}
