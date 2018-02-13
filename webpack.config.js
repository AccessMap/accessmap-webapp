const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './client');
const staticsPath = path.join(__dirname, './public');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
      MAPBOX_TOKEN: 'MAPBOX_TOKEN',
      MAPZEN_TOKEN: 'MAPZEN_TOKEN',
      TILESERVER: 'TILESERVER',
      APISERVER: 'APISERVER',
      ANALYTICS_KEY: 'ANALYTICS_KEY',
      ANALYTICS_SERVER: 'ANALYTICS_SERVER',
      FORCE_ANALYTICS: 'FORCE_ANALYTICS',
    }),
    new webpack.NamedModulesPlugin(),
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
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
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true
      })
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      map: './index.js',
      vendor: ['react']
    },
    output: {
      path: staticsPath,
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader?name=client/fonts/roboto/[name].[ext]'
        },
      ],
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        sourcePath,
        'node_modules',
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        'rakam-js$': 'rakam-js/rakam.js',
      }
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
      }
    },

    devServer: {
      contentBase: './client',
      historyApiFallback: true,
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
        }
      },
      proxy: {
        '/api': {
          target: process.env.APISERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        },
        '/tiles': {
          target: process.env.TILESERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/tiles': '' }
        },
        '/analytics': {
          target: process.env.ANALYTICS_SERVER,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/analytics': '' }
        },
      }
    }
  };
};
