/*
随机给定一个数组，实现一个函数输出给定的数组元素可以组合的所有情况
例如： 给定数组 [1,2] 输出 
[
  [1,2],
  [2,1]
]
 给定数组 [1,1,2] 输出
 [
   [1,1,2],
   [1,2,1],
   [2,1,1]
 ]

 */

function randomArr(list) {
  let result = []

  function dfs(arr, arr2) {
    if (arr2.length == 0) {
      result.push(arr)
    } else {
      let obj = new Set()
      arr2.forEach((item, i) => {
        if (!obj.has(item)) {
          let last = [].concat(arr2)
          last.splice(i, 1)
          dfs([...arr, item], last)
          obj.add(item, true)
          // console.log(obj)
        } else {
          console.log(item, '---', obj)
        }
      })
    }
  }

  dfs([], list)
  return result
}


console.log(randomArr([1,1]))
console.log(randomArr([1,1,2]))
console.log(randomArr([1,2,3]))