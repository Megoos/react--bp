// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const base = require('./base');
const paths = require('./paths');

const PORT = 3000;

module.exports = merge(base, {
  mode: 'development',
  resolve: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom', // alias example
    },
  },
  entry: paths.appIndexJs,
  devServer: {
    hot: true, // enable HMR on the servers
    port: PORT,
    compress: true,
    stats: 'errors-only',
    overlay: true,
    clientLogLevel: 'error',
    historyApiFallback: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new HardSourceWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
