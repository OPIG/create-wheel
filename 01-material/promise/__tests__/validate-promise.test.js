let Promise = require("../myPromise")

// let p = new Promise(function (resolve, reject) {
//   console.log(1111);
//   setTimeout(()=>{
//     // resolve('success')
//     reject('err')
//   }, 1000)
// })

// p.then(function (data) {
//   console.log(data, '++++');
//   return 32
// }, function (err) {
//   console.log(err, '****');
//   return 1
// }).then(function (data) {
//   console.log(data, '===');
// }, function (err) {
//   console.log(err, '----');
// })

const fs = require('fs')

function Read (url, charType = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(url, charType, (err, data) => {
      if (err) throw err
      console.log(data, `===>${url}`);
      resolve(data)
    })
  })
}

// Read('./1.txt').then((res) => {
//   console.log(res, '---111');
//   return Read('./2.txt')
// }).then(res => {
//   console.log(res, '----2');
//   return Read('./3.txt')
// }).then(data => {
//   console.log(data, '----3');
// })

function t(){
  return new Promise(res=>{
    setTimeout(()=>{
      res(234234234)
    },1000)
  })
}
// Promise.all([Read('01-material/promise/__tests__/3.txt'), Read('01-material/promise/__tests__/1.txt'), t(), 123]).then(res => {
//   console.log(res, '===');
// },(ee)=>{
//   console.log(ee,'99999');
// }).catch(e=>{
//   console.log(e,'0000');
// })


describe("Promise 测试", () => {
  it("", async () => {
    let arr = []
    await Promise.all([Read('01-material/promise/__tests__/3.txt'), Read('01-material/promise/__tests__/1.txt'), t(), 123]).then(res=>{
      arr = [...res]
    })
      expect(arr).toEqual(['this is 3', 'this is 1', 234234234, 123]);
  });
});
