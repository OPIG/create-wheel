/*
  //请实现发布订阅模式，具体是写出 on, emit, off，可以用 es6~es10

class Event {
  constructor(eventName) { 
      this.eventList = {}
  }

  on(cb) { 
      
  }

  emit(...args) { }

  off(cb) {}
}

// 以下是测试
const exampleEvent = new Event('example')
const callback1 = (a, b) => {
  console.log(a, b)
}
const callback2 = (a, b) => {
  console.log(b, a)
}
exampleEvent.on(callback1)
exampleEvent.on(callback2)
exampleEvent.emit(1, 2)
// 1,2
// 2,1
exampleEvent.off(callback1)
exampleEvent.emit(1, 2)
// 2,1
*/

class Event {
  constructor(eventName) {
    this.eventName = eventName
    this.eventList = {}
  }

  on(cb) {
    this.eventList[this.eventName] = this.eventList[this.eventName] || []
    this.eventList[this.eventName].push(cb)
  }

  emit(...args) {
    //for(let item in this.eventList) {
    for (let i = 0; i < this.eventList[this.eventName].length; i++) {
      this.eventList[this.eventName][i](...args)
    }
    //}
  }

  off(cb) {
    var index = this.eventList[this.eventName].indexOf((item) => item == cb)

    this.eventList[this.eventName].splice(index, 1)
  }
}

// 以下是测试
const exampleEvent = new Event('example')
const callback1 = (a, b) => {
  console.log(a, b)
}
const callback2 = (a, b) => {
  console.log(b, a)
}
exampleEvent.on(callback1)
exampleEvent.on(callback2)
exampleEvent.emit(1, 2)
// 1,2
// 2,1
exampleEvent.off(callback1)
exampleEvent.emit(1, 2)
// 2,1
