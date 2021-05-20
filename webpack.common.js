const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "AccessMap",
      filename: "index.html",
      template: "src/index.dev.html",
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // Re-enable node_modules exclusion once react-mapbox-gl stops 'require'ing
        // a css module
        // exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!react-md)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: "file-loader?name=src/fonts/roboto/[name].[ext]"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 }
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true
        }
      }
    ]
  },
  resolve: {
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ".js",
      ".jsx"
    ],
    modules: [path.resolve("./src"), "node_modules"],
    alias: {
      "rakam-js$": "rakam-js/rakam.js",
      "mapbox-gl": "maplibre-gl"
    }
  }
};
