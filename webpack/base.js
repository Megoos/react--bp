// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg|webp)$/i, cacheFolder: `${paths.appCache}/imagemin` }),
  ];

  if (!isPro) {
    base.push(
      new ForkTsCheckerWebpackPlugin({
        async: isDev,
        typescript: {
          mode: 'write-references',
          configFile: paths.appTsConfig,
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
        eslint: {
          enabled: true,
          files: `${paths.appSrc}/**/*.{ts,tsx}`,
          options: {
            cache: true,
            cacheLocation: `${paths.appCache}/.eslintcache`,
          },
        },
      }),
      new StyleLintPlugin()
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
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
