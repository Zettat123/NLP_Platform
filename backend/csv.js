const csv = require('csv')
const fs = require('fs')

new Promise((resolve, reject) => {
  const parser = csv.parse({ delimiter: ',', columns: true }, (err, data) => {
    data.map((item) => {
      (item.key = item['']), delete item['']
    })
    // console.log(data)
    resolve(data)
  })

  fs.createReadStream('D:\\testcsv.csv').pipe(parser)
}).then(data => console.log(data))
