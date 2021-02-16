const { merge } = require('webpack-merge');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const base = require('./base');

const PORT = 3000;

module.exports = merge(base, {
  mode: 'development',
  cache: {
    type: 'filesystem',
    cacheDirectory: paths.appCache,
  },
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
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  ],
});
