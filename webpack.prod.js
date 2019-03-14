const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("production"),
      MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
      API_SERVER: JSON.stringify(process.env.API_SERVER),
      ROUTING_SERVER: JSON.stringify(process.env.ROUTING_SERVER),
      TILE_SERVER: JSON.stringify(process.env.TILE_SERVER),
      ANALYTICS_SERVER: JSON.stringify(process.env.ANALYTICS_SERVER),
      ANALYTICS: JSON.stringify(process.env.ANALYTICS),
      ANALYTICS_KEY: JSON.stringify(process.env.ANALYTICS_KEY)
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
});
