// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


// module.exports = {
//   // entry: './src/index.js',
//   entry: {
//     // app: './src/index.js',
//     // print: './src/print.js',
//     app: './src/index.js',
//     vendor: [
//       'lodash'
//     ]
//     // another: './src/another-module.js'
//   },
//   mode: 'development',
//   // devtool: 'inline-source-map',
//   // devServer: {
//   //   contentBase: './dist',
//   //   hot: true
//   // },
//   plugins: [
//     // new CleanWebpackPlugin(['dist']),
//     new HtmlWebpackPlugin({
//       title: 'Authoring Libraries'
//     }),
//     // new webpack.NamedModulesPlugin(),
//     // new webpack.HotModuleReplacementPlugin(),
//     // new UglifyJSPlugin()
//     new webpack.HashedModuleIdsPlugin() /*该插件用于缓存一些不常改动的资源，如lodash等库*/
//   ],
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//       name: 'vendor'
//     }
//   },
//   output: {
//     filename: '[name].[chunkhash].js',
//     // chunkFilename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           'file-loader'
//         ]
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/,
//         use: [
//           'file-loader'
//         ]
//       },
//       {
//         test: /\.(csv|tsv)$/,
//         use: [
//           'csv-loader'
//         ]
//       },
//       {
//         test: /\.xml$/,
//         use: [
//           'xml-loader'
//         ]
//       }
//     ]
//   }
// }

// const path = require('path')
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'webpack-numbers.js',
//     library: 'webpackNumbers',
//     libraryTarget: 'umd'
//   },
//   mode: 'production',
//   externals: {
//     lodash: {
//       commonjs: 'lodash',
//       commonjs2: 'lodash',
//       amd: 'lodash',
//       root: '_'
//     }
//   }
// }
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js',
    polyfill: './src/polyfills.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
      // join: ['lodash', 'join']
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  }
}