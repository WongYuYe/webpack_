const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
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
  entry: ['./src/index.js', './src/index.html'],

  /* 缓存
    hash：根据文件
    chunkHash: 根据块
    contentHash：根据内容
  */  
  output: {
    filename: 'js/built.[contentHash:10].js',
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
    new OptimizeCssAssetsWebpackPlugin()
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
  devtool: 'eval-source-map'
}