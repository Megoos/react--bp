// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const paths = require('./paths');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new TerserWebpackPlugin()];
  }

  return config;
};

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appPublic}/favicon.ico`,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfig,
      async: isDev,
      checkSyntacticErrors: true,
      useTypescriptIncrementalApi: true,
    }),
  ];

  if (isDev) {
    const dev = [
      ...base,
      new HardSourceWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ];

    return dev;
  }

  if (isProd) {
    const prod = [
      ...base,
      new MiniCssExtractPlugin({
        filename: `css/[name].[contenthash:8].css`,
        chunkFilename: `css/chunk/[id].[contenthash:8].css`,
        ignoreOrder: true, // Enable to remove warnings about conflicting order
      }),
    ];

    return prod;
  }

  return base;
};

const cssLoader = () => {
  const loaders = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[name]_[local]__[hash:base64:5]',
        },
        sourceMap: isDev,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [autoprefixer],
        sourceMap: isDev,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [paths.appSrc],
        },
        sourceMap: isDev,
      },
    },
  ];

  return loaders;
};

const jsLoader = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push({
      loader: 'eslint-loader',
      options: {
        cache: true,
        emitError: true,
        emitWarning: true,
      },
    });
  }

  return loaders;
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js(x?)|ts(x?))$/i,
        exclude: /node_modules/,
        use: [...jsLoader(), 'thread-loader'],
      },
      {
        test: /\.(css|scss)$/i,
        exclude: /node_modules/,
        use: [...cssLoader(), 'thread-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
          'thread-loader',
        ],
      },
    ],
  },
  plugins: plugins(),
  performance: {
    hints: false,
  },
  optimization: optimization(),
};
