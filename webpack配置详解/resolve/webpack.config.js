const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 
  entry: "./index.js",
  output: {
    // 文件名（目录+文件名）
    filename: "js/[name].js",
    // 输出文件目录（将所有资源输出的公共目录）
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: "development",
  // 解析模块的规则
  resolve: {
    // 模块路径别名，优点简写路径，缺点没有提示，如下@为src目录的简写
    alias: {
      '@': resolve(__dirname, 'src')
    },
    // 可忽略的后缀名
    extensions: [ '.js', '.json', '.less'],
    // 告诉webpack解析模块去找哪个路径，默认一级一级向上
    modules: [ resolve(__dirname, '../../node_modules'), 'node_modules']
  }
};
