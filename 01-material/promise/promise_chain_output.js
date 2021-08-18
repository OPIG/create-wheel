// create an Object u and implete below output chain
// u.console('1').timeOut(1000).console('2').timeOut(1000).console('3');

// 对象实现
let u = {
  p: Promise.resolve(),
  console: (val) => {
    u.p = u.p.then(() => {
      console.log(val);
    })
    return u
  },
  timeout: (wait) => {
    u.p = u.p.then(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(), wait)
      })
    })
    return u
  }
}

// u.timeout(2000).console(200).timeout(1000).console(123)

// 类实现
class uObj {
  constructor() {
    this.p = Promise.resolve()
  }

  console (val) {
    this.p = this.p.then(() => {
      console.log(val, 'uObj')
    })

    return this
  }

  timeout (wait) {
    this.p = this.p.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, wait);
      })
    })

    return this
  }
}

const _obj = new uObj()
// _obj.console(100).timeout(2000).console(200).console(300).timeout(3000).console(400)


// 仿照promise源码实现
var newU = {
  cbArr: [],
  console (val) {
    const fn = () => {
      console.log(val)
    }
    this.cbArr.push(fn)
    this.exec()
    return this
  },
  timeout (wait) {
    const fn = () => new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, wait)
    })
    this.cbArr.push(fn)
    return this
  },
  exec () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    // this.timer = setTimeout(this.run.bind(this),0)
    this.timer = setTimeout(() => { return this.run() }, 0)
  },
  async run () {
    while (this.cbArr.length > 0) {
      await this.cbArr.shift()()
    }
  }
}

newU.console(1100).timeout(2000).console(200).console(300).timeout(3000).console(400)