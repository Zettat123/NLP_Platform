const express = require('express')
const csv = require('csv')
const fs = require('fs')
const multer = require('multer')

const app = express()

const storage = multer.diskStorage({
  destination: `${__dirname}/Upload_Files`,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage })

app.post('/get_csv_objects', upload.single('file'), (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  console.log(req.file)
  const { path: filePath } = req.file

  new Promise((resolve, reject) => {
    const parser = csv.parse({ delimiter: ',', columns: true }, (err, data) => {
      data.map((item) => {
        (item.key = item['']), delete item['']
      })

      resolve(data)
    })

    fs.createReadStream(filePath).pipe(parser)
  }).then(data => res.end(JSON.stringify(data)))
})

app.listen(13579, () => console.log('Listening'))
