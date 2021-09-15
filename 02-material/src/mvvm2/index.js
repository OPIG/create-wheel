import Vue from './observer_compiler.js'
// import Vue from './vue.js'

let vm = new Vue({
  el: '#app',
  data: {
    name: 'atom',
    info: 'hello vue',
    msg: 'this is a message',
    num: 1
  },
  methods: {
    update_Info1: function(){
      alert("1==>" + this.msg)
    },
    update_Info2(){
      alert('2==>' + this.msg)
    }
  }
})
