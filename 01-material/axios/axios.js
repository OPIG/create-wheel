function Axios (config) {
  this.config = config
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

function InterceptorManager () {
  this.handlers = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({ fulfilled, rejected })
}

Axios.prototype.request = function (config) {
  let chain = [dispatchRequest, undefined]
  let promise = Promise.resolve(config)
  this.interceptors.request.handlers.forEach(fn => {
    chain.unshift(fn.fulfilled, fn.rejected)
  })

  this.interceptors.response.handlers.forEach(fn => {
    chain.push(fn.fulfilled, fn.rejected)
  })

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }

  return promise
}

function dispatchRequest (config) {
  return xhrAdapter(config).then(res => {
    return res
  }, err => {
    throw err
  })
}

function xhrAdapter (config) {
  return new Promise((resolve, rejected) => {
    let xhr = new XMLHttpRequest()
    if (config.cancelToken !=null) {
      config.cancelToken.promise.then(res => {
        xhr.abort()
        rejected(new Error('请求被取消'))
      })
    }
    xhr.open(config.method, config.url)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            status: xhr.status,
            statusText: xhr.statusText
          })
        } else {
          rejected(new Error({
            status: xhr.status,
            statusText: xhr.statusText
          }))
        }
      }
    }
  })
}

function CancelToken (executor) {
  let resolvePromise
  this.promise = new Promise(resolve => {
    resolvePromise = resolve
  })

  executor(function () {
    resolvePromise()
  })
}

function createInstance (config) {
  const context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key]
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })

  return instance
}

const axios = createInstance()

axios.CancelToken = CancelToken