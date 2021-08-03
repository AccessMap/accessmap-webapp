const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  plugins: [new MiniCssExtractPlugin(), new SpriteLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        // Re-enable node_modules exclusion once react-mapbox-gl stops 'require'ing
        // a css module
        // exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!react-md)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        issuer: /\.(ts)x?$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
        },
      },
      {
        test: /\.svg$/,
        issuer: /\.scss$/,
        loader: "svg-url-loader",
      },
    ],
  },
  resolve: {
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ],
    modules: [path.resolve("./src"), "node_modules"],
    alias: {
      "rakam-js$": "rakam-js/rakam.js",
      "mapbox-gl": "maplibre-gl",
      "@types/mapbox-gl": "@types/maplibre-gl",
    },
  },
};
