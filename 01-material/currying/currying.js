/**
 * JS函数柯里化
 * 
   https://www.zhangxinxu.com/wordpress/2013/02/js-currying/
  https://juejin.im/entry/58b316d78d6d810058678579
  http://blog.jobbole.com/77956/
  https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html
  https://zh.wikipedia.org/zh/%E6%9F%AF%E9%87%8C%E5%8C%96
  https://www.jianshu.com/p/2975c25e4d71
 */

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

module.exports = add