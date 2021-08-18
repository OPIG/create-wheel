// 手写 call apply bind方法

Function.prototype.myCall = function(context) {
  if(typeof this !== 'function'){
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)

  delete context.fn
  return result
}

Function.prototype.myApply = function(context){
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  context = context || window
  context.fn = this
  let result
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}

Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const self = this
  const args = [...arguments].slice(1)
  return function F(){
    // 检测new
    if(this instanceof F) {
      return self(...args, ...arguments)
    }

    // return self.apply(context, args.concat(...arguments))
    return self.call(context, ...args, ...arguments)
  }
}

// Reference: https://www.sohu.com/a/346203399_120133651