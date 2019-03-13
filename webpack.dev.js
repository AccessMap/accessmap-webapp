const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");

const path = require("path");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    new Dotenv({ systemvars: true }),
  ],
  devServer: {
    contentBase: "./src",
    historyApiFallback: {
      disableDotRule: true
    },
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: "\u001b[32m"
      }
    },
    proxy: {
      // Replace with /api/v1 for dev of api and just /api/ for docker testing
      "/api": {
        target: process.env.API_SERVER,
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      },
      "/api/directions": {
        target: process.env.ROUTERING_SERVER && path.join(process.env.ROUTING_SERVER, "directions"),
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      },
      "/tiles": {
        target: process.env.TILE_SERVER,
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/tiles": "" }
      },
      "/analytics":
        process.env.ANALYTICS === "yes"
          ? {
              target: process.env.ANALYTICS_SERVER,
              secure: false,
              changeOrigin: true,
              pathRewrite: { "^/analytics": "" }
            }
          : null
    }
  }
});
