const path = require('path')
const webpack = require('webpack')
// Extract styles into seperate files.
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// PostCSS plugins
const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')
const postcssPxToRem = require('postcss-pxtorem')

// @see https://github.com/webpack/loader-utils/issues/56
process.traceDeprecation = true

const isProduction = process.env.NODE_ENV === 'production'

const resolvePath = path.resolve.bind(null, __dirname)
const context = resolvePath('../src')

const entry = {
  app: ['./index'],
  vendor: [
    'react',
    'react-dom',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'history',
    'isomorphic-fetch',
  ],
}

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    minify: isProduction ? { collapseWhitespace: true } : false,
    template: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      sassLoader: {
        includePaths: [path.resolve(__dirname, 'src', 'scss')],
      },
      context: '/',
      postcss: () => [
        postcssFocus(), // Add a :focus to every :hover
        cssnext({
          browsers: ['last 2 versions', 'not ie <= 8'],
        }),
        postcssReporter({
          clearMessages: true,
        }),
        postcssPxToRem,
      ],
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['common', 'vendor'],
    minChunks: 2,
  }),
  // OccurrenceOrderPlugin is needed for long-term caching to work properly.
  // See http://mxs.is/googmv
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true,
  }),
]

const eslintConfig = require('../.eslintrc.json')

if (!isProduction) {
  eslintConfig.rules['no-unused-vars'] = 1
  eslintConfig.rules['no-console'] = 1
}

module.exports = {
  context,
  entry,
  plugins,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  output: {
    path: resolvePath('../dist'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    modules: [context, 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      app: context,
      actions: 'app/actions',
      components: 'app/components',
      pages: 'app/pages',
      animations: 'app/animations',
      helpers: 'app/helpers',
      hocs: 'app/hocs',
      selectors: 'app/selectors',
      middlewares: 'app/middlewares',
      lib: 'app/lib',
      styles: 'app/styles',
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
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
        include: context,
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'react-svg-loader'],
        include: resolvePath(context, 'icons'),
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
              localIdentName: '[name]-[local]-[hash:base64:5]',
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
      {
        test: /\.woff2?|ttf|eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
}
