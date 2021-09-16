// instanceof 就是判断构造函数的prototype属性是否出现在实例的原型链上
// https://blog.csdn.net/wyhstars/article/details/87918178

function instanceOf(left, right) {
  var proto = Object.getPrototypeOf(left)
  // var proto = left.__proto__
  while(true) {
    if(proto === null) {
      return false
    } 
    if(proto === right.prototype) {
      return true
    }

    proto = Object.getPrototypeOf(proto)
    // proto = proto.__proto__
  }
}


function Animal(catogory) {
  this.catogory = catogory
}

Animal.prototype.getCatogory = function() {
  return this.catogory
}

Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

var animal = new Animal('cat')

function Cat(name) {
  this.name = name
}

var cat = new Cat('miaomiao')

console.log(instanceOf(animal, Animal));
console.log(instanceOf(cat, Cat));
console.log(instanceOf(cat, Animal));