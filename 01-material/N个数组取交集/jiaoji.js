// 编写一个函数计算多个数组的交集
// 要求输出结果中每个元素一定是唯一的
// 使用reduce

var getIntersection = (...args) => {
  return Array.from(
    new Set(
      args.reduce((total, cur) => {
        return cur.filter((item) => {
          return total.includes(item)
        })
      })
    )
  )
}

console.log(getIntersection([2, 3], [1, 2]))
