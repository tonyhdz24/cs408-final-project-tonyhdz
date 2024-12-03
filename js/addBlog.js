// NewBlog page elements
const addNewBlogBTN = document.getElementById("addNewBlogBTN");
const addNewBlogForm = document.getElementById("new-blog-form");
const blogTitle = document.getElementById("blog-title");
const blogAuthor = document.getElementById("blog-author");
const blogTag = document.getElementById("blog-tag");
const blogText = document.getElementById("blog-text");

// C.R.U.D Functions :3
function addNewBlog() {
  // checking form inputs
  if (
    !blogTitle.value.trim() ||
    !blogAuthor.value.trim() ||
    !blogTag.value.trim() ||
    !blogText.value.trim()
  ) {
    alert("Please fill out all fields before adding a new blog.");
    return; // Exit the function if validation fails
  }

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
      title: blogTitle.value,
      author: blogAuthor.value,
      tag: blogTag.value,
      text: blogText.value,
    })
  );
  window.location.href = "allBlogs.html";
}

// Add a new blog event handler
addNewBlogBTN.onclick = (event) => {
  event.preventDefault(); // Prevent page reload

  addNewBlog();
  addNewBlogForm.reset();
};
