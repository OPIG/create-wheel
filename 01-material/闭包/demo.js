var a =0;
var b =0;
function A(a){
  A = function(b){
    console.log(a+b++)
  }
  console.log(a++)
}

A(1) // 1
A(2) // 4