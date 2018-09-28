const express = require('express')
const bodyParser = require('body-parser')
const csv = require('csv')
const fs = require('fs')
const multer = require('multer')
const { generateCsvFile } = require('./generateCsvFile')

const app = express()

app.use(bodyParser.json({ limit: '10000kb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

const storage = multer.diskStorage({
  destination: `${__dirname}/UploadedFiles`,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage })

app.post('/get_csv_objects', upload.single('file'), (req, res) => {
  console.log(req.file)
  const { path: filePath } = req.file

  new Promise((resolve, reject) => {
    const parser = csv.parse({ delimiter: ',', columns: true }, (err, data) => {
      const newData = data.reduce((acc, cur) => {
        const key = cur['']
        delete cur['']
        cur.number = key
        cur.keywords = ''
        return Object.assign({ [key]: cur }, acc)
      }, {})

      resolve(newData)
    })

    fs.createReadStream(filePath).pipe(parser)
  }).then(data => res.end(JSON.stringify(data)))
})

app.post('/generate_csv', (req, res) => {
  generateCsvFile(req.body).then(filePath => res.send(filePath))
})

app.get('/download_csv', (req, res) => {
  console.log('req.query is %o', req.query)
  res.download(req.query.filePath)
})

app.listen(13579, () => console.log('Listening'))
