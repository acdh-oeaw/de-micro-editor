const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  model: "development",
  devtool: "inline-source-map",
});
