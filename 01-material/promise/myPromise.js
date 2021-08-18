/*
  1. promise是构造函数 里面有两个参数 resolve代表成功的状态 reject代表失败的状态
  2. then里面的回调函数的结果是上面resolve和reject的参数内容
  3. 两者要么成功的状态 要么失败的状态 智能执行其中一个
  4. 当promise执行错误的时候 下一个then会执行成功的方法
*/

function Promise (executor) {
  // 状态 正在进行
  this.status = 'pending'
  // 成功的值
  this.success = void (0)
  // 失败的值
  this.error = void (0)
  // 
  this.onFufilledCallback = []
  this.onRejectedCallback = []
  let num = 0
  let that = this
  // 成功的函数
  function resolve (val) {
    if (that.status === 'pending') {
      that.success = val
      that.status = 'fulfilled'
      that.onFufilledCallback.forEach(fn => {
        // if (++that.num < that.onFufilledCallback.length) {
        fn()
        // }
      })
    }
  }
  // 失败的函数
  function reject (val) {
    if (that.status === 'pending') {
      that.error = val
      that.status = 'rejected'
      that.onRejectedCallback.forEach(fn => {
        // if (++that.num < that.onRejectedCallback.length) {
        fn()
        // }
      })
    }
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

// 定义then方法
Promise.prototype.then = function (onfulfilled, onrejected) {
  const that = this
  const promise2 = new Promise((resolve, reject) => {
    if (that.status === 'fulfilled') {
      try {
        resolve(onfulfilled(that.success))
      } catch (e) {
        reject(e)
      }
    }

    if (that.status === 'rejected') {
      try {
        resolve(onrejected(that.error))
      } catch (e) {
        reject(e)
      }
    }

    if (that.status === 'pending') {
      that.onFufilledCallback.push(() => {
        try {
          resolve(onfulfilled(that.success))
        } catch (e) {
          reject(e)
        }
      })
      that.onRejectedCallback.push(() => {
        try {
          resolve(onrejected(that.error))
        } catch (e) {
          reject(e)
        }
      })
    }
  })
  return promise2
}

// 定义catch方法
Promise.prototype.catch = function (callback) {
  // 其实就是执行then的错误信息
  return this.then(function () { }, callback)
}

module.exports = Promise