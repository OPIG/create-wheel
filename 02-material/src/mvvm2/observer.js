import Dep from "./dep"

export default class Observer {
  constructor(data) {
    this.data = data
    // 遍历对象完成所有数据的劫持
    this.walk(this.data)
  }
  /**
   * 遍历对象
   * @param {*} data 
   */
  walk (data) {
    if (!data || typeof data != 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**
   * 动态设置响应数据
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
  defineReactive (data, key, value) {
    let dep = new Dep()

    Object.defineProperty(data, key, {
      // 可遍历
      enumerable: true,
      // 不可再配置
      configurable: false,
      get: () => {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newValue) => {
        value = newValue
        dep.notify()
      }
    })

    // 递归 value中的值存在对象的情况
    this.walk(value)
  }
}