const { describe, expect, test } = require("@jest/globals");
const sum = require("./sum");


describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("two plus two is four", () => {
    expect(sum(2, 2)).toBe(4);
  })
});
