const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
    mandelbrot: "./src/mandelbrot.ts",
    pointcloud: "./src/pointcloud.ts",
    raytracer: "./src/raytracer.ts",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      { test: /\.glsl$/i, type: "asset/source" },
      { test: /\.tsx?$/, use: "ts-loader", exclude: "/node_modules/" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
