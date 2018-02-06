const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(['../dist'], {
      allowExternal: true,
    }),
    // @see https://stackoverflow.com/questions/39130860/minified-code-outside-of-node-env-production-this-means-slower-developmen
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'",
    }),
    new UglifyJSPlugin(),
  ],
})
