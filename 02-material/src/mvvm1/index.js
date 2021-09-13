import Vue from './observer_publish'
// 使用
var vm = new Vue({
  el: '#app',
  data: {
    title: '手写MVVM - 简易版',
    name: 'atom',
    age: 28
  }
})