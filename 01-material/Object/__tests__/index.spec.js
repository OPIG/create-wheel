require('../Object.assign')

let a = {
  name: "advanced",
  age: 18
}
let b = {
  name: "saucxs",
  book: {
      title: "You Don't Know JS",
      price: "45"
  }
}
let c = Object.assign(a, b);


describe("assign 测试", () => {
  it("assign2 的参数为 null 时 返回错误信息", () => {
    expect(Object.assign2(null)).toEqual({});
  });

  it("assign 测试 ", () => {
    expect(Object.assign2(a,b)).toEqual(c);
  });
});