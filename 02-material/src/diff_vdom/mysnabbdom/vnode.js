
/**
 * 把传入的5个参数组合成对象返回
 * @param {*} sel 
 * @param {*} data 
 * @param {*} children 
 * @param {*} text 
 * @param {*} elm 
 * @returns 
 */
export default function(sel, data, children, text, elm) {
  return {
    sel, data, children, text, elm
  }
}