// Object.assign模拟实现
// 实现Object.assign模拟实现大致思路：

// 1、判断原生的Object是否支持assign这个函数，如果不存在的话就会创建一个assign函数，并使用Object.defineProperty将函数绑定到Object上。

// 2、判断参数是否正确（目标参数不能为空，可以直接设置{}传递进去，但是必须有值）。

// 3、使用Object()转成对象，并保存为to，最后返回这个对象to。

// 4、使用for in 循环遍历出所有的可枚举的自有属性，并复制给新的目标对象（使用hasOwnProperty获取自有属性，即非原型链上的属性）

// 参考原生，实现代码如下，使用assign2代替assign。此处的模拟不支持symbol属性，因为es5中没有symbol。
// Object.assign() 方法不能正确拷贝 get ，set 属性
// Object.getOwnPropertyDescriptors() 得到是 对象自身属性(包括可枚举和不可枚举的)包括get.
// Object.getPrototypeOf() 得到的是 对象的原型

// 如果只是拷贝 自身可枚举属性，就可以只用 Object.assign 方法；
// 如果是要拷贝原型上的属性，就需要 Object.assign , Object.create, Object.getPrototypeOf 方法结合使用
// 如果是拷贝get /set 属性，就需要 结合 Ojbect.getOwnPropertyDescriptors 方法

if (typeof Object.assign2 != 'function') {
  Object.defineProperty(Object, 'assign2', {
    value: function (target) {
      'use strict';
      if (target == null) {
        // console.log('Cannot convert undefined or null to object');
        return {};
      }

      var to = Object(target)
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]
        if (nextSource != null) {
          // 使用 for..in 遍历对象 nextSource 获取属性值
          // 此处会同时检查其原型链上的属性
          for (var nextKey in nextSource) {
            // 使用 hasOwnProperty 判断对象 nextSource 中是否存在属性 nextKey
            // 过滤其原型链上的属性
            // 有的对象可能没有连接到Object.prototype上（通过Object.create(null)来创建），
            // 这种情况下，使用myObject.hasOwnProperty(..)就会失败，解决办法，使用call就可以了
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              // 赋值给对象 to,并在遍历结束后返回对象 to
              to[nextKey] = nextSource[nextKey];
            }
          }

        }
      }
      return to;
    },
    writable: true,
    configurable: true
  })
}