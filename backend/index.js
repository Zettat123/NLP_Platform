const express = require('express')
const bodyParser = require('body-parser')
const csv = require('csv')
const fs = require('fs')
const multer = require('multer')
const generateCsvFile = require('./generateCsvFile')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: `${__dirname}/UploadedFiles`,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage })

app.post('/get_csv_objects', upload.single('file'), (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
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
  res.header('Access-Control-Allow-Origin', '*')
  res.send(req.body)
  // generateCsvFile(req.body).then(filePath => res.download(filePath))
})

app.listen(13579, () => console.log('Listening'))
