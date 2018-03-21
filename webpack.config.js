const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  // entry: './src/index.js',
  entry: {
    // app: './src/index.js',
    // print: './src/print.js',
    app: './src/index.js',
    // another: './src/another-module.js'
  },
  mode: 'development',
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   title: 'Output Management'
    // })
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new UglifyJSPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     name: 'common'
  //   }
  // },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
}
