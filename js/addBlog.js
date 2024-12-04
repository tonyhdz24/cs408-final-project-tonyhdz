import { validateInput } from "../js/validateInput.js";

document.addEventListener("DOMContentLoaded", () => {
  const addNewBlogBTN = document.getElementById("addNewBlogBTN");
  const addNewBlogForm = document.getElementById("new-blog-form");
  const blogTitle = document.getElementById("blog-title");
  const blogAuthor = document.getElementById("blog-author");
  const blogTag = document.getElementById("blog-tag");
  const blogText = document.getElementById("blog-text");

  function addNewBlog() {
    if (
      !validateInput(
        blogTitle.value,
        blogAuthor.value,
        blogTag.value,
        blogText.value
      )
    ) {
      return;
    }

    console.log("Adding new blog 😽");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "PUT",
      "https://xzqsynoko9.execute-api.us-east-2.amazonaws.com/blogs"
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        title: blogTitle.value,
        author: blogAuthor.value,
        tag: blogTag.value,
        text: blogText.value,
      })
    );

    // Only redirect after the request is complete
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Blog added successfully!");
        window.location.href = "allBlogs.html"; // Move redirection here
      } else {
        console.error("Failed to add blog:", xhr.responseText);
        alert("Error adding blog. Please try again.");
      }
    };

    // Optionally handle errors
    xhr.onerror = () => {
      console.error("Network error occurred.");
      alert("Network error. Please check your connection and try again.");
    };
  }

  addNewBlogBTN.onclick = (event) => {
    event.preventDefault();
    addNewBlog();
    addNewBlogForm.reset();
  };
});
