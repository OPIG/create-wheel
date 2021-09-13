/**
 * JS函数柯里化
 * 
 * 1. “参数复用”
 * 2. “提前返回”
 * 3. “延迟计算
 * 
   https://www.zhangxinxu.com/wordpress/2013/02/js-currying/
  https://juejin.im/entry/58b316d78d6d810058678579
  http://blog.jobbole.com/77956/
  https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html
  https://zh.wikipedia.org/zh/%E6%9F%AF%E9%87%8C%E5%8C%96
  https://www.jianshu.com/p/2975c25e4d71
 */


  // 实现add(1)(2)(3)
function add () {
  var _args = [...arguments]
  var _adder = function () {
    _args = [..._args, ...arguments]
    return _adder
  }

  _adder.toString = function () {
    return _args.reduce((a, b) => a + b)
  }
  return _adder
}

// “提前返回” 兼容现代浏览器以及IE浏览器的事件添加方法
var addEvent = function (el, type, fn, capture) {
  if (window.addEventListener) {
    el.addEventListener(type, function (e) {
      fn.call(el, e);
    }, capture);
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, function (e) {
      fn.call(el, e);
    });
  }
};
// 上面的方法有什么问题呢？很显然，我们每次使用addEvent为元素添加事件的时候，(eg. IE6/IE7)都会走一遍if...else if ...，其实只要一次判定就可以了，怎么做？–柯里化。改为下面这样子的代码：
var addEvent = (function () {
  if (window.addEventListener) {
    return function (el, sType, fn, capture) {
      el.addEventListener(sType, function (e) {
        fn.call(el, e);
      }, (capture));
    };
  } else if (window.attachEvent) {
    return function (el, sType, fn, capture) {
      el.attachEvent("on" + sType, function (e) {
        fn.call(el, e);
      });
    };
  }
})();


module.exports = add