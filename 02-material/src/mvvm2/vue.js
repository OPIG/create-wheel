// import { tsConstructorType } from "@babel/types"
// import Compiler from "./compiler"
// import Observer from "./observer"

export default class Vue {
  constructor(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data || {}
    this.$methods = options.methods

    new Observer(this.$data)

    new Compiler(this)
  }
}

class Compiler {
  constructor(context) {
    this.$el = context.$el
    this.context = context
    if (this.$el) {
      console.log(this.$el);
      this.$fragment = this.nodeToFragment(this.$el)
      console.dir(this.$fragment);
      this.compiler(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }
  /**
   * 模板编译
   * @param {*} node 
   */
  compiler(node) {
    if(node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        if(child.nodeType == Node.ELEMENT_NODE) {
          // 当nodeType为Node.ELEMENT_NODE(1)时，说明是元素节点

        } else if(child.nodeType == Node.TEXT_NODE) {
          // 当nodeType为Node.TEXT_NODE(3)时，说明是文本节点

        }
      })
    }
  }
  nodeToFragment (node) {
    let fragment = document.createDocumentFragment()
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        if (!this.ignoreAble(child)) {
          fragment.appendChild(child)
        }
      })
    }

    return fragment
  }

  ignoreAble (node) {
    let reg = /^[\n\t\r]+/
    return (node.nodeType === Node.COMMENT_NODE || (node.nodeType == Node.TEXT_NODE && reg.test(node.textContent)))
  }
}

class Observer {
  constructor(data) {
    this.data = data
    this.walk(this.data)
  }

  walk (data) {
    if (!data || typeof data != 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive (data, key, value) {
    // todo add to watcher
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        return value
      },
      set: (newValue) => {
        value = newValue
        // todo notify watcher
      }
    })

    this.walk(value)
  }
}