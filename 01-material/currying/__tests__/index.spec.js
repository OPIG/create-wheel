let add = require("../currying");


describe("curring 测试", () => {
  it("", () => {
    expect(add(1)(2)(3).toString()).toBe(6);
  });
});
