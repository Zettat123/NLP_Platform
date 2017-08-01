const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const proxy = require('http-proxy-middleware')
const serveStatic = require('serve-static')
const morgan = require('morgan')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const router = require('../__mocks__/')

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const webpackConfig = isProduction
  ? require('./webpack.config.prod.js')
  : require('./webpack.config.dev.js')

const app = express()
const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
  },
})

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware(compiler))
app.use(serveStatic(path.resolve(__dirname, '..')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))

// cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization,Content-Type,X-Xsrftoken'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,PATCH,PUT,POST,DELETE,OPTIONS'
  )
  res.setHeader('Cache-Control', 'public, max-age=99999999')
  next()
})

if (isProduction) {
  const apiProxy = proxy({
    // TODO: YOUR SERVER
    target: 'http://example.com/api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // remove path
    },
  })

  app.use('/api', apiProxy)
} else {
  app.use('/api', router)
}

app.get('*', (req, res) => {
  // proxy to '/'
  const serveFile = http.get({ port }, (r) => {
    res.writeHead(r.statusCode, r.headers)
    r.pipe(res)
  })

  req.pipe(serveFile)
})

app.use((req, res) => {
  res.status(404).end()
})

app.listen(port, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } else {
    // eslint-disable-next-line no-console
    console.info('Listening at localhost:%s', port)
  }
})
