const router = require('express').Router()

// `/api/*` 请求
require('./apis').forEach(exportFn => exportFn(router))

router.get('*', (req, res) => {
  res.sendStatus(404)
})

module.exports = router
