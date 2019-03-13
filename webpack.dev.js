const common = require("./webpack.common.js");
const dotenv = require("dotenv");
const merge = require("webpack-merge");
const url = require("url");
const webpack = require("webpack");

// Insert definitions from .env into process.env
dotenv.config()

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
      "/api/v1/auth": {
        target: url.resolve(process.env.API_SERVER, "auth"),
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/auth": "" }
      },
      "/api/v1/profiles": {
        target: url.resolve(process.env.API_SERVER, "profiles"),
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/profiles": "" }
      },
      "/api/v1/user": {
        target: url.resolve(process.env.API_SERVER, "user"),
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/user": "" }
      },
      "/api/v1/routing": {
        target: process.env.ROUTING_SERVER && process.env.ROUTING_SERVER,
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/routing": "" }
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
