const path = require("path");
const shared = require("../../webpack.shared.config");
module.exports = {
  ...shared,
  entry: {
    "uniroll-svelte": path.join(__dirname, "src"),
  },
  output: {
    library: "UnirollSvelte",
    libraryTarget: "umd",
    filename: "[name].js",
    globalObject: "globalThis",
    path: path.join(__dirname, "dist"),
  },
};