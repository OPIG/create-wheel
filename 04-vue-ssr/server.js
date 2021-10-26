const Koa = require('koa')
const Router = require('koa-router')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const Vue = require('vue')
const VueServerRender = require('vue-server-renderer')
let ServerBundle = readFileSync('./dist/server.bundle.js', 'utf8')

const app = new Koa()
const router = new Router()

const template = readFileSync(resolve(__dirname, './dist/index.ssr.html'), 'utf8')

// 创建一个渲染函数
const render = VueServerRender.createBundleRenderer(ServerBundle, {
  template // 模板中必须要有 vue-ssr-outlet
})

router.get('/', async (ctx) => {
  // 通过渲染函数 渲染vue的实例
  ctx.body = await new Promise((resolve, rejected) => {
    render.renderToString((err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
})

app.use(router.routes())
app.listen(8080)
