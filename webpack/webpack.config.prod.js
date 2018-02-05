const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config')

const plugins = baseConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': "'production'",
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compressor: { warnings: false },
    output: { comments: false },
  }),
])

const prodConfig = Object.assign({}, baseConfig, {
  plugins,
  output: Object.assign({}, baseConfig.output, {
    publicPath: '/', // TODO: Your public path here
  }),
})

prodConfig.module.rules.forEach((rule) => {
  if (String(rule.test) === '/\\.scss$/') {
    // 由于 style-loader 会将所有的 css 样式插入到页面的 <style> 标签里，
    // 所以需要把 style-loader 去除
    // eslint-disable-next-line no-param-reassign
    rule.loaders = ExtractTextPlugin.extract(rule.loaders.slice(1))
  }
})

module.exports = prodConfig
