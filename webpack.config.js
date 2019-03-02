const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// Used to pass .env to webpack config process.env
require('dotenv').config();

/* Plugins */
// Used to pass .env to client JS that gets bundled
const Dotenv = require('dotenv-webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const sourcePath = path.join(__dirname, './client');
const staticsPath = path.join(__dirname, './public');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProfile = env && env.profile;
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new Dotenv({ systemvars: true }),
    new webpack.NamedModulesPlugin(),
    new SpriteLoaderPlugin(),
  ];

  if (isProfile) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true,
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      }),
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
      }),
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      map: './index.js',
      vendor: ['react'],
    },
    output: {
      path: staticsPath,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules\/(?!react-md)/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'icon-sprites.[hash:0].svg',
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'file-loader?name=client/fonts/roboto/[name].[ext]',
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        },
      ],
    },

    resolve: {
      extensions: [
        '.webpack-loader.js',
        '.web-loader.js',
        '.loader.js',
        '.js',
        '.jsx',
      ],
      modules: [
        sourcePath,
        'node_modules',
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        'rakam-js$': 'rakam-js/rakam.js',
      },
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      },
    },

    devServer: {
      contentBase: './client',
      historyApiFallback: {
        disableDotRule: true,
      },
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
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
          green: '\u001b[32m',
        },
      },
      proxy: {
        // Replace with /api/v1 for dev of api and just /api/ for docker testing
        '/api/v1': {
          target: process.env.API_SERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/api/v1': '' },
        },
        '/tiles': {
          target: process.env.TILE_SERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/tiles': '' },
        },
        '/analytics': {
          target: process.env.ANALYTICS_SERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/analytics': '' },
        },
      },
    },
  };
};
