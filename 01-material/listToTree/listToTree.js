/*
请实现 listToTree 函数
 - 根据 parentId 的关系把数组转换成树形结构，要求时间复杂度不能为 n^2
// 原始 list 如下
let list = [
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];

// 转换后如下
[
  {
    id: 1,
    name: "部门A",
    parentId: 0,
    children: [
      {
        id: 3,
        name: "部门C",
        parentId: 1,
        children: [{ id: 6, name: "部门F", parentId: 3 }],
      },
      {
        id: 4,
        name: "部门D",
        parentId: 1,
        children: [{ id: 8, name: "部门H", parentId: 4 }],
      },
    ],
  },
  {
    id: 2,
    name: "部门B",
    parentId: 0,
    children: [
      { id: 5, name: "部门E", parentId: 2 },
      { id: 7, name: "部门G", parentId: 2 },
    ],
  },
]

*/

let list = [
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
]


const listToTree = (list) => {
  const res = []
  const map = list.reduce((curr, next) => (curr[next.id] = next, next.children = [], curr), {})
  for(let item of list) {
    if(item.parentId == '0') {
      res.push(item)
      continue
    }
    if(item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }

  return res
}

module.exports = listToTree
// const result = listToTree(list);

// var expire = [
//   {
//     id: 1,
//     name: "部门A",
//     parentId: 0,
//     children: [
//       {
//         id: 3,
//         name: "部门C",
//         parentId: 1,
//         children: [{ id: 6, name: "部门F", parentId: 3 }],
//       },
//       {
//         id: 4,
//         name: "部门D",
//         parentId: 1,
//         children: [{ id: 8, name: "部门H", parentId: 4 }],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "部门B",
//     parentId: 0,
//     children: [
//       { id: 5, name: "部门E", parentId: 2 },
//       { id: 7, name: "部门G", parentId: 2 },
//     ],
//   },
// ]