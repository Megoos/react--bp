const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const base = require('./base');
const paths = require('./paths');

const isAnalyze = process.env.ANALYZE === 'true';

const optimization = () => {
  const config = {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 20,
      minSize: 20000,
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'framework',
          chunks: 'all',
          enforce: true,
          priority: -10,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          priority: -20,
        },
        default: {
          reuseExistingChunk: true,
          priority: -30,
        },
      },
    },
  };

  config.minimizer = [
    new TerserWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
      },
    }),
  ];

  return config;
};

module.exports = merge(base, {
  mode: 'production',
  entry: {
    app: paths.appIndexJs,
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: `js/chunk/[name].[contenthash:8].js`,
    path: paths.appBuild,
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`,
      chunkFilename: `css/chunk/[id].[contenthash:8].css`,
      ignoreOrder: true, // Enable to remove warnings about conflicting order
    }),
    new CopyWebpackPlugin([{ from: paths.appPublic, to: paths.appBuild }]),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // these options encourage the ServiceWorkers to get in there fast
      skipWaiting: true, // and not allow any straggling "old" SWs to hang around
      cleanupOutdatedCaches: true,
      exclude: [/\.(?:map|txt)$/, /icons\//, 'index.html', '.DS_Store'],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 40,
            },
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: isAnalyze ? 'server' : 'disabled',
    }),
  ],
  optimization: optimization(),
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
});
