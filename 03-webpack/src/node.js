const vm = require('vm')
const str = `
function test(require, module, exports) {
"use strict";

var _moduleB = _interopRequireDefault(require("./moduleB.js"));

require("./moduleA");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_moduleB.default);
}
`

vm.runInNewContext(str)