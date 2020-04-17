const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const webpack = require('webpack')

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const commonCssLoader = [
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]
module.exports = {
  // 单入口
  entry: './src/index.js',
  // 多入口
  // entry: {
  //   index: './src/index.js',
  //   add: './src/add.js'
  // }

  /*
    1. 可以将node_modules中代码单独打包一个chunk输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有单独打包成一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  /* 缓存
    hash：根据文件
    chunkHash: 根据块
    contentHash：根据内容
  */  
  output: {
    filename: 'js/[name].[contentHash:10].js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              ...commonCssLoader
            ]
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader,
              'less-loader'
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /*
                开启多进程打包
                缺点：开启进程需要600ms时间，进程通信也需要消耗，
                针对于babel，当js代码较多时，可开启
              */
              // {
              //   loader: 'thread-loader',
              //   options: {
              //     workers: 2
              //   }
              // },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: { version: 3 },
                        targets: {
                          chrome: '50',
                          firefox: '50'
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true,
                },
              },
              {
                loader: 'eslint-loader',
                options: {
                  formatter: require('eslint-friendly-formatter'),
                  fix: true
                }
              }
            ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              // esModule: false,
            }
          },
          {
            exclude: /\.(jpg|png|gif|html|js|css|less)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'medias'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      outputPath: 'build'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contentHash:10].css',
      path: resolve(__dirname, 'build')
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助serviceWorker快速启动
        2.删除旧的serviceWorker
        生成一个serviceWorker配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    }),
    // 告诉webpack哪些库不参与打包，同时引用时名称也需要修改
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出，并在html中自动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production',
  devServer: {
    port: 3000,
    contentBase: resolve(__dirname, 'build'),
    open: true,
    compress: true,
    /*
      HMR：hot module replacement 模块热重载
        作用：只替换当前修改的模块
        css: 依赖style-loader实现HMR
        js: 只针对于非入口js的文件，利用module.hot.accept('./xx.js', function(){})
        html: 一般只有一个入口index.html文件
    */
    hot: true,
  },
  // [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  devtool: 'hidden-source-map',

  /*
    tree-shaking: 去除无用代码
      开启条件：1. 必须使用es6模块化 2. 开启production环境
      作用：减少代码体积

      在package.json中设置
        "sideEffects": false 所有代码都可以进行tree shaking
          存在问题：可能会把 css @babel/polyfill文件干掉

        "sideEffects": ["*.css", "*.less"] 排除文件
  */


  externals: {
    // 忽略包 -> npm包，打包的时候会忽略
    jquery: 'jQuery'
  }
}