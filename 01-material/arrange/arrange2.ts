/*
实现一个arrange函数，可以进行时间和工作调度

*/

class Arrange {
  index = 0
  promises: Array<string | Promise<any>> = []
  constructor(info: string) {
      this.promises = [`${info} is notified`]
      this.index++
  }
  // 出现 `waitFirst` 从前面载入
  waitFirst = (s: number) => {
      this.promises.unshift(new Promise(resolve => setTimeout(resolve, s * 1000)))
      this.index = 1
      return this
  }
  // 出现 `wait` 消除 `waitFirst` 效果
  wait = (s: number) => {
      this.promises.splice(this.index, 0, new Promise(resolve => setTimeout(resolve, s * 1000)))
      this.index = this.promises.length
      return this
  }
  do = (task: 'commit' | 'push') => {
      switch (task) {
          case 'commit': this.promises.splice(this.index, 0, `Start  to  commit`); break;
          case 'push': this.promises.splice(this.index, 0, 'Start  to  push'); break;
          default: break;
      }
      this.index++
      return this
  }
  run = async (log = (info: any) => {}) => {
      for (let i = 0; i < this.promises.length; i++) {
          const info = await Promise.resolve(this.promises[i]);
          log && info && log(info)
      }
      return this
  }
}

const arrange = (s = '') => {
  const a = new Arrange(s)
  setTimeout(() => {
      console.time('run:')
      a.run(function (info) {
          console.timeLog('run:', info)
      })
  }, 0);
  return a
}

// arrange('William');
// arrange('William').wait(5).do('commit');
arrange('William').waitFirst(5).do('push');