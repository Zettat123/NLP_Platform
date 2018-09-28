const csv = require('csv')
const fs = require('fs')

const { stringify } = csv

const generateCsvFile = data =>
  new Promise((resolve, reject) => {
    const columns = Object.keys(data[0]).reduce(
      (acc, cur) => Object.assign({ [cur]: cur }, acc),
      {}
    )
    const arrayData = []
    Object.keys(data).map(key => arrayData.push(data[key]))

    stringify(
      arrayData,
      {
        delimiter: ',',
        header: true,
        columns,
      },
      (_, output) => {
        fs.writeFile(`./Generated_Files/${Date.now()}.csv`, output, (err) => {
          if (err) {
            console.error(err)
          } else {
            resolve()
          }
        })
      }
    )
  })

module.exports = { generateCsvFile }
