const csv = require('csv')
const fs = require('fs')

const { stringify } = csv

// Structure of data from browser
const dataStructure = {
  // key equals number
  0: {
    target: 'place',
    rid: '1004293',
    id: '1004293:0',
    text: 'Judging ',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '51',
    to: '56',
    number: '0',
    keywords: '',
  },
  1: {
    target: 'staff',
    rid: '1004293',
    id: '1004293:1',
    text: 'We, there rude.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '75',
    to: '80',
    number: '1',
    keywords: '',
  },
}

const columns = {
  number: '',
  target: 'target',
  rid: 'rid',
  id: 'id',
  text: 'text',
  keywords: 'keywords',
  not_keywords: 'not_keywords',
  category_first: 'category_first',
  category_second: 'category_second',
  polarity: 'polarity',
  from: 'from',
  to: 'to',
}

const generateCsvFile = data =>
  new Promise((resolve, reject) => {
    const arrayData = []
    Object.keys(data).map(key => arrayData.push(data[key]))

    stringify(
      arrayData,
      {
        delimiter: ',',
        header: true,
        columns,
      },
      (stringifyError, output) => {
        if (stringifyError) {
          reject(stringifyError)
        } else {
          const filePath = `${__dirname}/GeneratedFiles/${Date.now()}.csv`
          fs.writeFile(filePath, output, (writeError) => {
            if (writeError) {
              reject(writeError)
            } else {
              resolve(filePath)
            }
          })
        }
      }
    )
  })

module.exports = { generateCsvFile }
