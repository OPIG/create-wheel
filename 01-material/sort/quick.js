/* 快速排序

  首先取出中间的元素，用中间元素和其他元素相比较，比中间元素小的放在一个数组中，比中间元素大的放在另一个数组中，
  然后对这两个数组进行同样的操作，最后把所有细分的数组连接起来

  思路：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，
  则可分别对这两部分记录继续进行排序，以达到整个序列有序。
*/

function quick (arr) {
  if (arr.length <= 1) {
    return arr
  }
  let left = []
  let right = []
  let middleIndex = Math.floor(arr.length / 2)
  let middleVal = arr.splice(middleIndex, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleVal) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quick(left).concat(middleVal, quick(right))
}

console.log(quick([10, 18, 3, 4, 2, 7, 0]));