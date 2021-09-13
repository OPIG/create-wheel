// vue 采用数据劫持(数据代理)配合发布订阅模式来实现
// 数据劫持用的是Object.defineProperty
// 编译模板用的正则匹配
// 数据只有一份，模板中相同数据的dom有多份，这里是一对多的关系，用到的是观察者模式
export default class Vue {
  constructor(options) {
    this.$options = options
    this.$el = document.querySelector(this.$options.el)
    this.$data = this.$options.data
    this.subjectObj = {} // 每个数据都有很多个订阅者
    this.proxy() // 实现数据劫持
    this.compile() // 模板编译
  }

  // 劫持 劫持的是数据 是目标
  proxy () {
    // 数据劫持
    for (let key in this.$data) {
      this.subjectObj[key] = new Subject()
      Object.defineProperty(this, key, {
        get () {
          return this.$data[key]
        },
        set (newVal) {
          this.$data[key] = newVal
          this.subjectObj[key].notify(newVal)
        }
      })
    }
  }

  // 编译 编译的是dom 观察者
  compile () {
    // 编译模板
    const that = this
    compileAll(this.$el)
    function compileAll (currEl) {
      var arr = currEl.children
      for (var i = 0; i < arr.length; i++) {
        const reg = /{{(.*)}}/g
        if (arr[i].children.length > 0) {
          compileAll(arr[i])
        } else {
          if (arr[i].tagName == 'INPUT') {
            var key = arr[i].getAttribute('v-model')
            arr[i].value = that[key]
            arr[i].oninput = function (newVal) {
              that.subjectObj[key].notify(this.value)
              // that.subjectObj[key].notify(newVal.target.value)
            }
          } else {
            var key = reg.exec(arr[i].innerHTML)[1]
            arr[i].innerHTML = `${key}: ` + that[key]
          }
          var observer = new Observer(arr[i])
          that.subjectObj[key]?.addObserver(observer)
        }
      }
    }
  }
}


class Subject{
  constructor(){
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notify(newVal){
    this.observers.forEach(observer => {
      observer.update(newVal)
    })
  }
}


class Observer{
  constructor(el){
    this.el = el
  }
  update(newVal) {
    if(this.el.tagName == 'INPUT') {
      if(this.el.value != newVal) {
        this.el.value = newVal
      }
    } else {
      if(this.el.innerHTML != newVal) {
        this.el.innerHTML = newVal
      }
    }
  }
}