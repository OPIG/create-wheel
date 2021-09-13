import vNode from './vnode'

/**
 * 低配版h函数， 必须接受3个参数，缺一不可， 重载功能较弱
 * 调用的时候必须是下面的三种形态之一
 * 1. h('div', {}, 'string')
 * 2. h('div', {}, [])
 * 3. h('div', {}, h())
 * @param {*} sel
 * @param {*} data
 * @param {*} c
 */
export default function (sel, data, c) {
  // 检查函数的参数个数
  if (arguments.length != 3) {
    throw new Error('低配版h函数，必须传入3个合理参数')
  }

  if (['string', 'number'].includes(typeof c)) {
    // 说明现在调用h函数形态1
    return vNode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 说明现在调用h函数形态2
    let children = []
    // 遍历c， 收集children
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入数组参数中的缺失h函数')
      }
      children.push(c[i])
    }

    // 循环结束 说明children收集完毕，此时可以返回虚拟节点
    return vNode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 说明现在调用h函数形态3
    let children = [c]
    return vNode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传人的第三个参数类型不对')
  }
}
