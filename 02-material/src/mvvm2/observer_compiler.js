import Compiler from "./compiler.js"
import Observer from "./observer.js"

export default class Vue {
  constructor(options) {
    // 获取元素dom对象
    this.$el = document.querySelector(options.el)
    // 转存数据
    this.$data = options.data || {}

    // 数据和函数的代理
    this._proxyData(this.$data)

    // // 数据劫持
    // new Observer(this.$data)

    // // 模板编译
    // new Compiler(this)
  }

  /**
   * 数据的代理 把data对象上的数据挂到vue实例上
   * @param {*} data 
   */
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        set(newValue) {
          data[key] = newValue
        },
        get() {
          return data[key]
        }
      })
    })
  }

  /**
   * 函数的代理 把传过来的函数挂载到vue实例上
   * @param {*} methods 
   */
  _proxyMethods(methods) {
    if(methods && typeof methods === 'object') {
      Object.keys(methods).forEach(key => {
        this[key] = methods[key]
      })
    }
  }
}

window.Vue = Vue