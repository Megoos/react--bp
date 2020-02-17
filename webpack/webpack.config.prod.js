const merge = require('webpack-merge');
const { resolve } = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const base = require('./webpack.config.base');

const paths = require('./paths');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
    app: paths.appIndexJs
  },
  output: {
    filename: '[chunkhash]__[name].js',
    path: paths.appBuild,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
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
