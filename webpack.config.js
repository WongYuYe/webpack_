
const { resolve } = require('path')

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
      }
    ]
  },
  plugins: [
    // 详细plugins的配置
  ],
  mode: 'development'
}