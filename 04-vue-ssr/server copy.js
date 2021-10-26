const Koa = require('koa')
const Router = require('koa-router')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const Vue = require('vue')
const VueServerRender = require('vue-server-renderer')

const app = new Koa()
const router = new Router()

const vm = new Vue({
  data() {
    return { msg: 'hello World!' }
  },
  template: '<div> {{msg}}</div>'
})

const template = readFileSync(resolve(__dirname, './template.html'), 'utf8')

// 创建一个渲染函数
const render = VueServerRender.createRenderer({
  template // 模板中必须要有 vue-ssr-outlet
})

router.get('/', async (ctx) => {
  // 通过渲染函数 渲染vue的实例
  ctx.body = await render.renderToString(vm)
})

app.use(router.routes())
app.listen(8080)
