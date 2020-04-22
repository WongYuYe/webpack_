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
  devServer: {
    // 服务内容路径，只有当你想要提供静态文件时必需
    contentBase: resolve(__dirname, 'build'),
    // 监听contentBase下的文件内容，一旦变化就reload
    watchContentBase: true,
    // 监听配置
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 启动gzip
    compress: true,
    // 开启HMR
    hot: true,
    // 监听端口
    port: 5000,
    // 域名，当设置以下时可被外部访问
    host: '0.0.0.0',
    // 客户端日志 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'
    clientLogLevel: 'none',
    // 除了基本启动信息，其他信息不回打印
    quiet: true,
    // 非全屏显示错误信息，boolean = false object: { errors boolean = false, warnings boolean = false }
    overlay: true,
    proxy: {
      // 转发服务，当接收到/api/xxx时，转发到localhost:8080上
      '/api': {
        target: 'http://localhost:8080',
        // 重写路径 /api/xxx -> /xxx
        pathRewrite: {
          '^/api': ''
        },
        // 是否修改host请求头里的origin
        changeOrigin: true,
      }
    }
  }
};
