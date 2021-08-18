let Promise = require("../myPromise")

let p = new Promise(function(resolve, reject) {
  console.log(1111);
  // setTimeout(()=>{
  //   // resolve('success')
  //   reject('err')
  // }, 1000)
  reject('err')
})

p.then(function(data){
  console.log(data, '++++');
  return 32
}, function(err){
  console.log(err, '****');
  return 1
}).then(function(data){
  console.log(data,'===');
}, function(err){
  console.log(err, '----');
})