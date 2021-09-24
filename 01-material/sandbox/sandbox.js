// node  沙箱
const vm = require('vm');
const x = 1;
const sandbox = { x: 1 };
vm.createContext(sandbox); // 创建沙箱

const code = 'x += 40; var y = 1;';
vm.runInContext(code, sandbox);

console.log(sandbox.x); // 41
console.log(sandbox.y); // 1

console.log(x); // 1;