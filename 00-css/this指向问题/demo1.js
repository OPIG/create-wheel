var a1 = {
  user: 'bing',
  fn: function () {
    console.log(this.user)
  }
}

a1.fn() // bing
var b1 = a1.fn
b1() // undefined
b1.call(a1) // bing

// ===============================================

var a2 = {
  user: 'bing',
  fn: () => {
    // 改成箭头函数
    console.log(this.user)
  }
}

a2.fn() // undefined
var b2 = a2.fn
b2() // undefined
b2.call(a2) // undefined
