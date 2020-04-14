const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    jquery: ['jquery']
  },

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    // 打包的库向外暴露的包名
    library: '[name]_[hash:10]',
  },

  plugins: [
    // 打包生成一个manifest.json，提供entry里的包映射
    new webpack.DllPlugin({
      name: '[name]_[hash:10]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],

  mode: 'production'
}