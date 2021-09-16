Array.prototype.myReduce = function (...args) {
  let arr = this
  let fn = args[0]
  let initValue
  let index

  if (args.length > 1) {
    initValue = args[1]
    index = 0
  } else {
    initValue = arr[0]
    index = 1
  }

  let value = initValue
  for (let i = index, len = arr.length; i < len; i++) {
    value = fn(value, arr[i])
  }
  return value
}

var result = [1, 20, 3, 4].myReduce(function (a, b) {
  return a + b
})
console.log(result);


var result1 = [1, 20, 3, 4].myReduce(function (a, b) {
  return a + b
}, 10)

console.log(result1);