const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 
  entry: "./index.js",
  output: {
    // 文件名（目录+文件名）
    filename: "js/[name].js",
    // 输出文件目录（将所有资源输出的公共目录）
    path: resolve(__dirname, "build"),
    // 公共路径前缀
    publicPath: '/',
    // 非入口chunk名
    chunkFilename: 'js/chunk_[name].js',
    // 整个库向外暴露的变量名 如果浏览器环境为window，node环境为global
    // library: 'global',
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: "development",
};
