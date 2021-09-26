// 另一种写法参见currying1.js

const add = (...arg) => arg.reduce((prev, curr) => (curr += prev), 0)

function currying(fn) {
  let args = [...arguments].slice(1)
  var reg = function (...arg) {
    if (arg.length == 0) {
      var res = fn(...args)
      args = []
      return res
    } else {
      args = [...args, ...arg]
      return reg
    }
  }

  return reg
}

const curryAdd = currying(add)

const val = curryAdd(1)(2)(3)(4)()
const val2 = curryAdd(1)(2)(3)(41)()
console.log(val2)
