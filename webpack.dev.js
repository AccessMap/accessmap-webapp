const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require("dotenv");

// Insert definitions from .env into process.env
dotenv.config()

const path = require("path");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
      API_SERVER: JSON.stringify(process.env.API_SERVER),
      ROUTING_SERVER: JSON.stringify(process.env.ROUTING_SERVER),
      TILE_SERVER: JSON.stringify(process.env.TILE_SERVER),
      ANALYTICS_SERVER: JSON.stringify(process.env.ANALYTICS_SERVER),
      ANALYTICS: JSON.stringify(process.env.ANALYTICS),
      ANALYTICS_KEY: JSON.stringify(process.env.ANALYTICS_KEY)
    })
  ],
  devServer: {
    contentBase: "./src",
    historyApiFallback: {
      disableDotRule: true
    },
    port: 3000,
    open: false,
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
