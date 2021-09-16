export default class Vue {
  constructor(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods
    this.subscrbeObj = {}

    this.addDataToInstance(this.$data)
    // 数据代理
    this.proxy(this.$data)
    // 模板编译
    this.compiler(this)
  }

  addDataToInstance(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get: () => {
          return data[key]
        },
        set: (newValue) => {
          data[key] = newValue
        }
      })
    }
  }

  compiler(_this) {
    const context = _this
    const el = this.$el
    this._walk(el, context)
  }
  _walk(el, context) {
    var arr = el.children
    console.log(context)
    for (var i = 0; i < arr.length; i++) {
      const reg = /{{(.*)}}/g
      if (arr[i].children.length) {
        this._walk(arr[i], context)
      } else {
        if (arr[i].tagName === 'INPUT') {
          var key = arr[i].getAttribute('v-model')
          arr[i].value = context[key]

          arr[i].addEventListener('input', (e) => {
            this.subscrbeObj[key].notify(e.target.value)
          })
        } else {
          var key = reg.exec(arr[i].innerHTML)[1]
          arr[i].innerHTML = context[key]
        }

        var observer = new Observer(arr[i])
        this.subscrbeObj[key].addObserver(observer)
      }
    }
  }
  proxy(data) {
    if (data && typeof data == 'object') {
      for (let key in data) {
        this._defineReactive(data, key, data[key])
      }
    }
  }

  _defineReactive(data, key, value) {
    //todo add to watch
    this.subscrbeObj[key] = new Subject()
    const _this = this
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        return value
      },
      set: (newValue) => {
        value = newValue
        _this.subscrbeObj[key].notify(newValue)
      }
    })
  }
}

class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notify(newValue) {
    this.observers.forEach((observer) => {
      observer.update(newValue)
    })
  }
}

class Observer {
  constructor(el) {
    this.el = el
  }

  update(newvalue) {
    if (this.el) {
      if (this.el.tagName === 'INPUT') {
        if (this.el.value !== newvalue) {
          this.el.value = newvalue
        }
      } else {
        if (this.el.innerHTML !== newvalue) {
          this.el.innerHTML = newvalue
        }
      }
    }
  }
}
