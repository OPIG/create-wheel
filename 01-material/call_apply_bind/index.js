// 手写 call apply bind方法

Function.prototype.myCall = function(context) {
  if(typeof this !== 'function'){
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)

  delete context.fn
  return result
}

/*
  call的实现
  第一个参数为null或者undefined时，this指向全局对象window，值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean
  为了避免函数名与上下文(context)的属性发生冲突，使用Symbol类型作为唯一值
  将函数作为传入的上下文(context)属性执行
  函数执行完成后删除该属性
  返回执行结果
*/
Function.prototype.myCall1 = function(context,...args){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol() 
  cxt[func] = this;
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
}

// =================================

Function.prototype.myApply = function(context){
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  context = context || window
  context.fn = this
  let result
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}

/*
  前部分与call一样
第二个参数可以不传，但类型必须为数组或者类数组
*/

Function.prototype.myApply1 = function(context,args = []){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
}


// ============================

Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const self = this
  const args = [...arguments].slice(1)
  return function F(){
    // 检测new
    if(this instanceof F) {
      return self(...args, ...arguments)
    }

    // return self.apply(context, args.concat(...arguments))
    return self.call(context, ...args, ...arguments)
  }
}

/*
  需要考虑：

bind() 除了 this 外，还可传入多个参数；
bind 创建的新函数可能传入多个参数；
新函数可能被当做构造函数调用；
函数可能有返回值；
实现方法：

bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）
实现作用域绑定（apply）
参数传递（apply 的数组传参）
当作为构造函数的时候，进行原型继承

*/
Function.prototype.myBind1 = function (context, ...args) {
  //新建一个变量赋值为this，表示当前函数
  const fn = this
  //判断有没有传参进来，若为空则赋值[]
  args = args ? args : []
  //返回一个newFn函数，在里面调用fn
  return function newFn(...newFnArgs) {
      if (this instanceof newFn) {
          return new fn(...args, ...newFnArgs)
      }
      return fn.apply(context, [...args,...newFnArgs])
  }
}

// 测试
let name = '小王',age =17;
let obj = {
    name:'小张',
    age: this.age,
    myFun: function(from,to){
        console.log(this.name + ' 年龄 ' + this.age+'来自 '+from+'去往'+ to)
    }
}
let db = {
    name: '德玛',
    age: 99
}

//结果
obj.myFun.myCall1(db,'成都','上海');     // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myApply1(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind1(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind1(db,['成都','上海'])();   // 德玛 年龄 99  来自 成都, 上海去往 undefined


// Reference: https://www.sohu.com/a/346203399_120133651