import { validateInput } from "../js/validateInput.js";

QUnit.module("Validation Tests", function () {
  QUnit.test("Valid inputs should return true", function (assert) {
    const result = validateInput("title", "author", "tag", "text");
    assert.strictEqual(result, true, "Expected true for valid inputs.");
  });

  QUnit.test("Empty title should return false", function (assert) {
    const result = validateInput("", "author", "tag", "text");
    assert.strictEqual(result, false, "Expected false for empty title.");
  });
});
