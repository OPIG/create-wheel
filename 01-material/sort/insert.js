
/* 插入排序

  思路：通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。可以理解为玩扑克牌时的理牌；
*/

function insert (arr) {
  let newArr = []
  newArr.push(arr[0])
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]
    for (let j = newArr.length - 1; j >= 0; j--) {
      if (current > newArr[j]) {
        newArr.splice(j + 1, 0, current)
        break
      }
      if (j == 0) {
        newArr.unshift(current)
      }
    }
  }
  console.log(newArr);
  return newArr
}

insert([10, 8, 3, 4, 2, 7, 0])