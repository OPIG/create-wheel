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










// ========================================
var p1 = new Promise((resolve, reject) => {
  setTimeout (() => resolve('success'), 3000)
})

var p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('error')), 3000)
})

p1.then(function(post){
  return p2
}).then((resolve) => {
  console.log('p2 reject ')
  return '2 then'
}).catch((e) => {
  console.log(e, '===first error')
}).then((resolve) => {
  console.log('third then---', resolve)
}).catch((e) => {
  console.log(e, '===error')
})

