// 服务端的入口
import createApp from './main'
// 服务端需要调用当前这个文件产生一个vue的实例
export default () => {
  const { app } = createApp()
  return app
}

// 服务端配置好后，需要导出给node来使用
