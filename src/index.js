/* index.js: webpack入口文件
1. 运行指令：
  开发环境：webpack ./src/index.js -o ./build/build.js --mode=development
    weboack会以./src/index.js为入口文件开始打包，打包输出到./build/build.js，环境为开发模式
  生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
    weboack会以./src/index.js为入口文件开始打包，打包输出到./build/build.js，环境为开发模式
  2. 结论：
    1. webpack能处理js/json，不能处理css/img等其他资源
    2. 生产环境和开发环境将ES6模块化编译编译成浏览器能识别的模块化
    3. 生产环境比开发环境多一个压缩js代码
*/
import data from './data.json'
console.log(data);

import './index.css'
import './index.less'

function add(x, y) {
  return x + y
}
console.log(add(1, 2));
