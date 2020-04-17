const { resolve } = require("path");
module.exports = {
  /*
    打包入口
    1. 单入口 
      entry: './index.js'
      打包形成一个chunk，输出一个bundle，默认chunk名为main
    2. 多入口
      entry: ['./index.js','./src/add.js']
      打包形成一个chunk，输出一个bundle，默认chunk名为main
      只有在HMR模式下使html热更新生效
    3. 多入口
      entry: {
        index: './index.js',
        add: './src/add.js'
      }
      打包形成多个chunk，输出多个bundle，chunk名为key值
  */
  entry: {
    index: "./index.js",
    add: "./src/add.js",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [],
  mode: "development",
};
