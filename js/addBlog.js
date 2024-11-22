// NewBlog page elements
const addNewBlogBTN = document.getElementById("addNewBlogBTN");
const addNewBlogForm = document.getElementById("new-blog-form");
const blogTitle = document.getElementById("blog-title");
const blogAuthor = document.getElementById("blog-author");
const blogTag = document.getElementById("blog-tag");
const blogText = document.getElementById("blog-text");
const blogId = document.getElementById("blog-id");

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
      blogId: blogId.value,
      title: blogTitle.value,
      author: blogAuthor.value,
      tag: blogTag.value,
      text: blogText.value,
    })
  );
}

// Add a new blog event handler
addNewBlogBTN.onclick = (event) => {
  event.preventDefault(); // Prevent page reload

  addNewBlog();
  addNewBlogForm.reset();
};
