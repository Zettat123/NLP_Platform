module.exports = router =>
  router
    .get('/list', (req, res) => res.send({ data: [1, 2, 3, 4] }))
    .post('/data', (req, res) => res.send({ message: 'success' }))
