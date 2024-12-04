export function validateInput(title, author, tag, text) {
  if (!title.trim() || !author.trim() || !text.trim()) {
    alert("Please fill out all fields before adding a new blog.");
    return false;
  }
  return true;
}
