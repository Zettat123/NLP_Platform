const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AliyunOSSWebpackPlugin = require('aliyunoss-webpack-plugin')
const baseConfig = require('./webpack.config')

const shouldUploadToOSS = process.env.UPLOAD_TO_OSS === 'true'

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

if (shouldUploadToOSS) {
  plugins.push(
    new AliyunOSSWebpackPlugin({
      buildPath: path.resolve(__dirname, '../dist/*.*'),
      region: '', // TODO 填写OSS的region
      accessKeyId: '', // TODO 填写OSS的accessKeyId
      accessKeySecret: '', // TODO 填写OSS的accessKeySecret
      bucket: '', // TODO 填写OSS的bucket
      generateObjectPath(filename) {
        // 该方法用于修改文件名称，可以在文件名前加路径以确定文件存储位置，默认为原文件名
        return filename
      },
    })
  )
}

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
