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
      filename: './css/built.css'
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
