const merge = require('webpack-merge');
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
  }
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
});
