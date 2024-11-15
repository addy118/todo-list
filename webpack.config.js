// for handling html file
const HtmlWebpackPlugin = require("html-webpack-plugin");

// default import
const path = require("path");

module.exports = {
  // default configuration object
  mode: "development",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  // for auto-reload, ease-in-debugging, source-map, and watching for html file
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"],
  },

  // for handling html file
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  // for handling css, html images & js images
  module: {
    rules: [
      {
        // for loading css imported in js files
        test: /\.css/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // for loading images in html files
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        // for loading images in js files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
