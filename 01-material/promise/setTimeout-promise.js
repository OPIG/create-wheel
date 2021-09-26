// 输出012345
const tasks = []
for (var i = 0; i < 5; i++) {
  ;((j) => {
    tasks.push(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(j)
          resolve()
        }, 500 * j)
      })
    )
  })(i)
}

Promise.all(tasks).then((res) => {
  setTimeout(() => {
    console.log(i)
  })
})
