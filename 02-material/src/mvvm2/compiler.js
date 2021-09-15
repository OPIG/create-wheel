import Watcher from "./watcher"

export default class Compiler {
  constructor(context) {
    this.$el = context.$el
    this.context = context
    if (this.$el) {
      // 把原始的dom转换为文档片段
      this.$fragment = this.nodeToFragment(this.$el)
      // 编译模板
      this.compiler(this.$fragment)

      // 把文档片段添加到页面中
      this.$el.appendChild(this.$fragment)
    }
  }

  /**
   * 模板编译
   * @param {*} node 
   */
  compiler (node) {
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        if (child.nodeType == Node.ELEMENT_NODE) {
          // 当nodeType为Node.ELEMENT_NODE(1)时，说明是元素节点
          this.compilerElementNode(child)

        } else if (child.nodeType == Node.TEXT_NODE) {
          // 当nodeType为Node.TEXT_NODE(3)时，说明是文本节点
          this.compilerTextNode(child)
        }
      })
    }
  }

  /**
   * 编译元素节点
   * @param {*} node 
   */
  compilerElementNode (node) {
    // todo 完成元素的编译，包括指令等
    let that = this
    let attrs = [...node.attributes]
    attrs.forEach(attr => {
      let { name: attrName, value: attrValue } = attr
      if (attrName.indexOf('v-') === 0) {
        let dirName = attrName.slice(2)
        switch (dirName) {
          case "text":
            new Watcher(attrValue, this.context, newValue => {
              node.nodeContent = newValue
            })
            break;
          case "model":
            new Watcher(attrValue, this.context, newValue => {
              node.value = newValue
            })
            node.addEventListener('input', e => {
              that.context[attrValue] = e.target.value
            })
            break;
        }
      }

      if (attrName.indexOf('@') == 0) {
        this.compilerMethods(this.context, node, attrName, attrValue)
      }
    })
    this.compiler(node)
  }

  /**
   * 
   * @param {*} scope 
   * @param {*} node 
   * @param {*} attrNamem 
   * @param {*} attrValue 
   */
  compilerMethods (scope, node, attrName, attrValue) {
    let type = attrName.slice(1)
    let fn = scope[attrValue]
    node.addEventListener(type, fn.bind(scope))
  }
  /**
   * 编译文本节点
   * @param {*} node 
   */
  compilerTextNode (node) {
    let text = node.textContent.trim()
    if (text) {
      // 把text字符串，转换为表达式
      let exp = this.parseTextExp(text)
      // 添加订阅者，计算表达式的值
      // 当表达式依赖的数据发生变化时候，1.重新计算表达式的值2.node.textContent给最新的值
      // 即可完成model -> View的响应式
      new Watcher(exp, this.context, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  parseTextExp (text) {
    // 匹配插值表达式正则, ()很重要，匹配到{{}}中的内容
    let regText = /\{\{(.+?)\}\}/g
    // 分割插值表达式前后内容
    let pices = text.split(regText)
    // 匹配插值表达式
    let matches = text.match(regText)
    // 表达式数组
    let tokens = []
    pices.forEach(item => {
      if (matches && matches.indexOf("{{" + item + "}}") > -1) {
        tokens.push("(" + item + ")")
      } else {
        tokens.push("`" + item + "`")
      }
    })

    return tokens.join('+')
  }

  /**
   * 把所有元素转为文档片段 - 减少页面回流
   * @param {*} node 
   */
  nodeToFragment (node) {
    let fragment = document.createDocumentFragment()
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {

        // 判断是不是我们需要添加的节点
        // 如果是注释节点或无用的换行我们是不添加的
        if (!this.ignoreAble(child)) {
          fragment.appendChild(child)
        }
      })
    }
    return fragment
  }

  /**
   * 忽略哪些节点不添加到文档片段
   * @param {*} node 
   * @returns 
   */
  ignoreAble (node) {
    var reg = /^[\t\n\r]+/
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    return (node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent)))
  }
}