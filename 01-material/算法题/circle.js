
// 剑指 Offer 62. 圆圈中最后剩下的数字 约瑟夫环
// 不完全正确， 且性能低 
    var arr = new Array(m).fill().map((v,i)=>i + 1);
    var index = 0;
    while (arr.length > 1){
        index = (index + n - 1) % arr.length;
        arr.splice(index,1);
        index -= 1;
        if (index < 0){
            index = arr.length - 1;
        }
        console.log(arr);
    }
    console.log(arr[0]);