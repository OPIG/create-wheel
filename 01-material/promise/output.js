// 描述下面的输出结果及输出时间

let arr = [1,2,4,5]
arr.forEach(async item => {
  var temp = await(cal(item))
  console.log(temp)
})

function cal(n) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(n*n)
      }, 1000)
  })
}