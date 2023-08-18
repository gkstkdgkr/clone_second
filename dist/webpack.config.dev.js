"use strict";

// dirname =directory name
// path.resolve => 경로 지정
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recoder: "./src/client/js/recoder.js"
  },
  mode: "development",
  watch: true,
  plugins: [new MiniCssExtractPlugin({
    filename: "css/styles.css"
  })],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {
            targets: "defaults"
          }]]
        }
      }
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
    }]
  }
};