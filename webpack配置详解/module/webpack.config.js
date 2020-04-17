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
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        // 排除某个文件路径
        exclude: '/node_module/',
        // 包含某个文件路径
        include: resolve(__dirname, 'src'),
        // 针对匹配文件排序执行 pre前，post后
        enforce: 'pre',
        options: {
          
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: "development",
};
