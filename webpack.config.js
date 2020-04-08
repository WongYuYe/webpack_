
const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/*
  loader: 1.下载 2.配置
  plugin: 1.下载 2.引入 3.配置
*/
module.exports = {
  // 入口起点
  entry: './src/index.js',

  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // 数组中loader执行顺序：从右到左，从下到上依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载Js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // 数组中loader执行顺序：从右到左，从下到上依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载Js中，里面内容是样式字符串
          'css-loader',
          // 将less文件编译成css文件
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)/,
        loader: 'url-loader',
        options: {
          // 图片大小小于3kb，会以base64格式处理
          // 优点：减少请求
          // 缺点：体积更大
          limit: 3 * 1024,
          // url-loader默认使用es6模块解析，而html-loader默认使用commonjs引入图片
          // 解析会出现问题： [Object Module]
          // 解决：关闭es6模块化，使用commonjs
          // 最新html-loader版本已解决此问题
          // esModule: false,

          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html中的img标签，引入Img，给url-loader处理
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    // 详细plugins的配置
    // html-webpack-plugin
    // 默认会创建一个空的html，自动引入打包输出的所有资源
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}