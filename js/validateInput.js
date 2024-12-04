/**
 * Validates the input fields for creating a new blog post.
 *
 * This function checks if the provided title, author, and text fields
 * are not empty or just whitespace. If any of these fields are empty,
 * it alerts the user to fill out all fields and returns false.
 * Otherwise, it returns true to indicate that the input is valid.
 *
 * @param {string} title - The title of the blog post.
 * @param {string} author - The author of the blog post.
 * @param {string} text - The content of the blog post.
 * @returns {boolean} - Returns true if all required fields are filled, otherwise false.
 */
export function validateInput(title, author, text) {
  if (!title.trim() || !author.trim() || !text.trim()) {
    alert("Please fill out all fields before adding a new blog.");
    return false;
  }
  return true;
}
