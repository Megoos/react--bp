const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.config.base');

const paths = require('./paths');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
    app: paths.appIndexJs
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: `js/chunk/[name].[contenthash:8].js`,
    path: paths.appBuild,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]__[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('cssnano'), require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [paths.appSrc]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEV__: false
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`,
      chunkFilename: `css/chunk/[name].[contenthash:8].css`,
      ignoreOrder: false
    })
  ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
  optimization: {
    minimizer: [new TerserWebpackPlugin()]
  }
});
