const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
 
  entry: "./index.js",
  output: {
    // 文件名（目录+文件名）
    filename: "js/[name].js",
    // 输出文件目录（将所有资源输出的公共目录）
    path: resolve(__dirname, "build"),
    chunkFilename: 'js/[name]_[contentHash:10]_chunk.js'
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: "production",
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
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, // 最小分割的chunk大小
      // maxSize: 0, // 最大，没有限制
      minChunks: 1, // 要提取的chunk最少被引用的次数
      maxAsyncRequests: 5, // 按需加载时并行加载的最大请求数
      maxInitialRequests: 3, // 入口js并行加载的最大请求书
      name: true, //自定义命名规则
      automaticNameDelimiter: '~',  //名称连接符
      // 分割chunk的组
      cacheGroups: {
        // node_modules的包会被打包到vendor~xx.js
        vendor: {
          test:/[\\/]node_modules[\\/]/, // 匹配路径
          priority: -10,  // 优先级
        },
        default: {
          minChunks: 2, // 最少引用次数
          priority: -20,
          reuseExistingChunk: true  // 复用之前打包的表
        }
      }
    },
    // 将当前模块的其他模块的hash单独打包成一个文件runtime，解决修改a文件导致b文件的contentHash发生变化 
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}` 
    },
    minimizer: [
      // 配置生产环境的压缩方案，js和css
      new TerserWebpackPlugin({
        // 缓存
        cache: true,
        // 开启多进程
        parallel: true,
        // 开启sourceMap
        sourceMap: true,
      })
    ]
  }
};
