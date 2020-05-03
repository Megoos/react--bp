// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const Dotenv = require('dotenv-webpack');
const WebpackBar = require('webpackbar');
const autoprefixer = require('autoprefixer');
const postcssNormalize = require('postcss-normalize');

const paths = require('./paths');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isPro = process.env.NODE_TYPE === 'pro';

const optimization = () => {
  const config = {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new WebpackBar(),
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appPublic}/favicon.ico`,
      cache: true,
      minify: isProd,
    }),
  ];

  if (!isPro) {
    base.push(
      new ForkTsCheckerWebpackPlugin({
        tsconfig: paths.appTsConfig,
        async: isDev,
        checkSyntacticErrors: true,
        useTypescriptIncrementalApi: true,
        eslint: true,
        eslintOptions: {
          cache: true,
          cacheLocation: `${paths.appCache}/.eslintcache`,
        },
      }),
      new StyleLintPlugin(),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg|webp)$/i, cacheFolder: `${paths.appCache}/imagemin` })
    );
  }

  return base;
};

const cssLoader = () => {
  const loaders = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
        plugins: [autoprefixer, postcssNormalize],
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

  return loaders;
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
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
        test: /\.(png|jpe?g|gif|webp)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (isDev) {
                  return '[name].[ext]';
                }

                return '[name].[contenthash:8].[ext]';
              },
              outputPath: 'images',
            },
          },
          'thread-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          'thread-loader',
        ],
      },
    ],
  },
  plugins: plugins(),
  optimization: optimization(),
  performance: {
    hints: false,
  },
};
