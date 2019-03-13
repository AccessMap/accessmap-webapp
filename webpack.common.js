const webpack = require("webpack");
const path = require("path");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.bundle.js",
  },
  plugins: [
    new SpriteLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          query: {
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.css$/,
        // Re-enable node_modules exclusion once react-mapbox-gl stops 'require'ing
        // a css module
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
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
        loaders: ["style-loader", "css-loader", "sass-loader"]
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
    modules: [
      path.join(__dirname, "./src"),
      "node_modules",
      path.resolve(__dirname, "node_modules")
    ],
    alias: {
      "rakam-js$": "rakam-js/rakam.js"
    }
  }
};
