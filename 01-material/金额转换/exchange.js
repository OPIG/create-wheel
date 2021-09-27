// 给定一个金额，转换成中间带逗号的金额
// 例： 123456789  --> 123,456,789

// \B：匹配非单词边界
// (?=)：正向零宽断言
// \d{3}：匹配三个数字字符
// +：与前面的\d{3}结合表示匹配3的整数倍个数字字符
// $：字符串结尾
// 所以合起来的意思就是：匹配单词中的某个位置，这个位置之后的字符全部为数字，且出现次数是3的整数倍。
var num = 142345678912.01

// 网上看的
var abs = function (val) {
  var str = val.toFixed(2) + ''
  var intSum = str
    .substring(0, str.indexOf('.'))
    .replace(/\B(?=(?:\d{3})+$)/g, ',')
  var dot = str.substring(str.length, str.indexOf('.'))
  var res = intSum + dot

  return res
}

console.log(abs(num))

/**************************************** */


// 优雅不优雅
function reg(val) {
  val = val + ''
  // return val.replace(/(\d{1})(?=(?:\d{3})+$)/g, '$1,') // 不能匹配小数点
  // return val.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,') // 能匹配小数点
  return val.replace(/(\B)(?=(\d{3})+(?!\d))/g,'$1,')
}

console.log(reg(num))


/**************************************** */



// 方法1 数字不能太长，容易死循环
// function change(val) {
//   var val = val + ''
//   while (val.match(/(\d{4})+/)) {
//     val = val.replace(/(\d{1})((\d{3})+$)/, function (i, j, k) {
//       return j + ',' + k
//     })
//   }
//   return val
// }

// console.log(change(num))
/**************************************** */

// 方法2
function exchange(val) {
  let reg = /(\d{3}?)/g

  let str = val.toString()
  let memo
  let last = str.length % 3
  if (str.length && !last) {
    memo = str.replace(reg, function (_, i) {
      return i + ','
    })
  } else {
    var ee = new RegExp('^\\d{' + last + '}?')
    memo = str.replace(ee, function (_, i) {
      return _ + ','
    })
    memo = memo.replace(reg, function (_, i) {
      return i + ','
    })
  }

  memo = memo.substring(0, memo.length - 1)
  return memo
}

console.log(exchange(num))

// 方法3  数字直接转 toLocaleString
function toLocaleString(val) {
  return val.toLocaleString()
}

console.log(toLocaleString(num));