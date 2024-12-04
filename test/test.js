import { validateInput } from "../js/validateInput.js";

QUnit.module("Validation Tests", function () {
  /**
   * Test case for validating correct inputs.
   * This test ensures that when all input fields (title, author, tag, text) are filled out,
   * the validation function returns `true`.
   */
  QUnit.test("Valid inputs should return true", function (assert) {
    const result = validateInput("title", "author", "tag", "text");
    assert.strictEqual(result, true, "Expected true for valid inputs.");
  });
  /**
   * Test case for an empty title input.
   * This test checks that if the title field is left empty, the validation function should return `false`.
   */
  QUnit.test("Empty title should return false", function (assert) {
    const result = validateInput("", "author", "tag", "text");
    assert.strictEqual(result, false, "Expected false for empty title.");
  });
});
