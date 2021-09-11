import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
} from 'snabbdom'
// import { h } from 'snabbdom';
import h from './mysnabbdom/h'

// 创建出patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

// 创建虚拟节点
// const myVnode = h(
//   'a',
//   {
//     props: {
//       href: 'http://www.atguigu.com',
//       target: '_blank'
//     }
//   },
//   '尚硅谷'
// )
const myVnode2 = h('ul', {}, [
  h('li', {}, 'apple'),
  h('li', {}, 'orange'),
  h('li', {}, [h('div', {}, h('span', {}, 'others'))])
])

console.log(myVnode2)

const container = document.getElementById('container')
patch(container, myVnode2)
