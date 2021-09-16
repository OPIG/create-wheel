class EventEmmit {
  constructor() {
    this.cache = {}
  }
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }
  off(name, fn) {
    var tasks = this.cache[name]
    if (tasks) {
      var index = tasks.findIndex((f) => f == fn || f.callback == fn)
      if (index > 0) {
        tasks.splice(index, 1)
      }
    }
  }
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      // 创建副本 如果回调函数中继续注册相同事件会造成死循环
      var tasks = this.cache[name].slice()
      for (let fn of tasks) {
        fn(...args)
      }

      if (once) {
        delete this.cache[name]
      }
    }
  }
}

var enventBus = new EventEmmit()

var fn1 = function(name, age){
  console.log(`${name} ${age}`);
}

var fn2 = function(name, age){
  console.log(`hello ${name} ${age}`);
}

enventBus.on('aaa', fn1)
enventBus.on('aaa', fn2)
enventBus.emit('aaa', false, 'atom', 20)
enventBus.emit('aaa', true, 'atom-once', 20)
enventBus.emit('aaa', false, 'atom-test', 20)