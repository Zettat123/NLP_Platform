const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const port = 3000

const app = express()
const config = require('./webpack.dev.js')

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.listen(port, (error) => {
  if (error) {
    // eslint-disable-next-lint no-console
    console.log(error)
  } else {
    // eslint-disable-next-lint no-console
    console.log(`App is listening on port ${port} ...`)
  }
})
