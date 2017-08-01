const webpack = require('webpack')
const baseConfig = require('./webpack.config')

const hotMiddlewareScript = 'webpack-hot-middleware/client'
const addEntryScript = (entry) => {
  Object.keys(entry).forEach((key) => {
    if (Array.isArray(entry[key])) {
      entry[key].unshift(hotMiddlewareScript)
    }
  })
  return entry
}

module.exports = Object.assign({}, baseConfig, {
  devtool: 'eval-source-map',
  entry: addEntryScript(baseConfig.entry),
  plugins: baseConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '\'development\'',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
})
