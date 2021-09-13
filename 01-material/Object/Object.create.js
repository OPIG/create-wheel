
/*
https://www.jianshu.com/p/28d85bebe599
https://es6.ruanyifeng.com/


Object.create() 与 new Object()
 1. 创建对象的方式不同
 new Object() 通过构造函数来创建对象, 添加的属性是在自身实例下。
Object.create() es6创建对象的另一种方式，可以理解为继承一个对象, 添加的属性是在原型下。
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}

Object.create()方法创建的对象时，属性是在原型下面的，也可以直接访问 b.rep // {rep: "apple"} ,
此时这个值不是吧b自身的，是它通过原型链proto来访问到b的值。

*/

/**
 * 2. 创建对象属性的性质不同
 *
 *   // 创建一个以另一个空对象为原型,且拥有一个属性p的对象
      o = Object.create({}, { p: { value: 42 } })
      // 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
      o.p = 24
      o.p
      //42

      o.q = 12
      for (var prop in o) {
        console.log(prop)
      }
      //"q"

      delete o.p
      //false

      Object.create() 用第二个参数来创建非空对象的属性描述符默认是为false的，而构造函数或字面量方法创建的对象属性的描述符默认为true
 */

/**
 * 3创建空对象时不同
 * 当用构造函数或对象字面量方法创建空对象时，对象时有原型属性的，即有_proto_;
    当用Object.create()方法创建空对象时，对象是没有原型属性的。
 */