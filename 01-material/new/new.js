function objectFactory() {
  var obj = new Object()
  var Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var res = Constructor.apply(obj, arguments)
  // res || obj 这么写考虑了构造函数显示返回null的情况
  return typeof res === 'object' ? res || obj : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.getName = function () {
  return this.name
}

var p1 = objectFactory(Person, 'atom', 28)
var p2 = objectFactory(Person, 'atom', 28)
console.dir(p1.getName())
p1.name = 'yuan'
console.log(p1.getName());
console.log(p2.getName());
