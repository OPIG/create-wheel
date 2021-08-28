/* 选择排序

  选择排序是：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，
  再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
  以此类推，直到所有元素均排序完毕。
*/

function selectSort (arr) {
  let n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]]
  }
  return arr
}

console.log(selectSort([10, 18, 3, 4, 2, 7, 0]));