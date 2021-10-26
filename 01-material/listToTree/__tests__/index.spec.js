var listToTree = require('../listToTree')

// const result = listToTree(list);

var expire = [
  {
    id: 1,
    name: "部门A",
    parentId: 0,
    children: [
      {
        id: 3,
        name: "部门C",
        parentId: 1,
        children: [{ id: 6, name: "部门F", parentId: 3, children:[] }],
      },
      {
        id: 4,
        name: "部门D",
        parentId: 1,
        children: [{ id: 8, name: "部门H", parentId: 4 , children:[] }],
      },
    ],
  },
  {
    id: 2,
    name: "部门B",
    parentId: 0,
    children: [
      { id: 5, name: "部门E", parentId: 2, children:[]  },
      { id: 7, name: "部门G", parentId: 2 , children:[] },
    ],
  },
]

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

describe("listToTree", () => {
  it("listToTree结果相等", () => {
    expect(listToTree(list)).toEqual(expire);
  });

})