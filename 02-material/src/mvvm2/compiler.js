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
    }
  }

  /**
   * 模板编译
   * @param {*} node 
   */
  compiler (node) {

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

  ignoreAble (node) {
    var reg = /^[\t\n\r]+/
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    return (node.nodeType === 8 && node.nodeType === 3 && reg.test(node.textContent))
  }
}