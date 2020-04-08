// development config
const merge = require('webpack-merge');
const base = require('./base');
const paths = require('./paths');

const PORT = 3000;

module.exports = merge(base, {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    `webpack-dev-server/client?http://localhost:${PORT}`, // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    paths.appIndexJs,
  ],
  devServer: {
    hot: true, // enable HMR on the servers
    port: PORT,
    compress: true,
    stats: 'errors-only',
    overlay: true,
  },
  devtool: 'eval-cheap-module-source-map',
});
