const { resolve } = require("path");
const HtmlWebapckPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          /*
            css兼容性 postcss -> postcss-loader postcss-preset-env

            配置在package.json中，表示浏览器兼容性列表
            browserslist: {
              'development': [
                'last 1 chorme version',
                'last 1 firefox version',
                'last 1 safari version',
              ],
              'production': [
                '> 0.2%',
                'not dead',
              ]
            }
          */
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')()
              ]
            }
          },
        ],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: "url-loader",
        options: {
          limit: 2 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "../imgs",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(jpg|png|html|js|css|less)/,
        loader: "file-loader",
        options: {
          limit: 2 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "medias",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/built.css",
    }),
  ],
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    contentBase: resolve(__dirname, "build"),
    compress: true,
  },
};
