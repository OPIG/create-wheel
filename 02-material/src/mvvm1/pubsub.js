
// https://github.com/mroderick/PubSubJS

class PubSub {
  constructor() {
    this.obj = {}
  }

  // 订阅
  subscribe (eventType, callback) {
    // 第一次这个数组不存在，就先创建一个空数组，把eventType作为对象的key
    this.obj[eventType] = this.obj[eventType] || []
    this.obj[eventType].push(callback) // 把订阅的事件回调放到数组中
  }

  // 发布
  // 把eventType这个事件类型对应的回调函数一个一个取出并执行
  publish (eventType) {
    this.obj[eventType].forEach(cb => {
      cb()
    });
  }
}

var pubsub = new PubSub()

// 第一个用户
pubsub.subscribe('customer-event', function() {
  console.log('第一个用户');
})
// 第二个用户
pubsub.subscribe('customer-event', function() {
  console.log('第二个用户');
})

pubsub.publish('customer-event')