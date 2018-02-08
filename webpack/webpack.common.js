const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolvePath = path.resolve.bind(null, __dirname)
const context = resolvePath('../src')

const isProduction = process.env.NODE_ENV === 'production'
const eslintConfig = require('../.eslintrc.json')

const entry = {
  app: ['./index.js'],
}

if (!isProduction) {
  entry.app.unshift('webpack-hot-middleware/client')
}

module.exports = {
  context,
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Template',
      filename: 'index.html',
      template: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
  ],
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: resolvePath('../dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [context, 'node_modules'],
    extensions: ['.js'],
    alias: {
      app: context,
      actions: 'app/actions',
      components: 'app/components',
      pages: 'app/pages',
      selectors: 'app/selectors',
      styles: 'app/styles',
      hocs: 'app/hocs',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: eslintConfig,
        include: context,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: context,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:4]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
        include: context,
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'], // Do not transform vendor's CSS with CSS-modules
        }),
      },
    ],
  },
}
