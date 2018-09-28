const csv = require('csv')
const { generateCsvFile } = require('./generateCsvFile')

// const { stringfy } = csv

const data = [
  {
    '': '0',
    target: 'place',
    rid: '1004293',
    id: '1004293:0',
    text:
      'Judging from previous posts this used to be a good place, but not any longer.',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '51',
    to: '56',
  },
  {
    '': '1',
    target: 'staff',
    rid: '1004293',
    id: '1004293:1',
    text:
      'We, there were four of us, arrived at noon - the place was empty - and the staff acted like we were imposing on them and they were very rude.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '75',
    to: '80',
  },
  {
    '': '2',
    target: 'NULL',
    rid: '1004293',
    id: '1004293:2',
    text:
      'They never brought us complimentary noodles, ignored repeated requests for sugar, and threw our dishes on the table.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '0',
    to: '0',
  },
  {
    '': '3',
    target: 'food',
    rid: '1004293',
    id: '1004293:3',
    text: 'The food was lousy - too sweet or too salty and the portions tiny.',
    category_first: 'FOOD',
    category_second: 'QUALITY',
    polarity: 'negative',
    from: '4',
    to: '8',
  },
  {
    '': '4',
    target: 'portions',
    rid: '1004293',
    id: '1004293:3',
    text: 'The food was lousy - too sweet or too salty and the portions tiny.',
    category_first: 'FOOD',
    category_second: 'STYLE_OPTIONS',
    polarity: 'negative',
    from: '52',
    to: '60',
  },
  {
    '': '5',
    target: 'NULL',
    rid: '1004293',
    id: '1004293:4',
    text: 'After all that, they complained to me about the small tip.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '0',
    to: '0',
  },
  {
    '': '6',
    target: 'place',
    rid: '1004293',
    id: '1004293:5',
    text: 'Avoid this place!',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '11',
    to: '16',
  },
  {
    '': '7',
    target: 'food',
    rid: '1014458',
    id: '1014458:0',
    text:
      'I have eaten at Saul, many times, the food is always consistently, outrageously good.',
    category_first: 'FOOD',
    category_second: 'QUALITY',
    polarity: 'positive',
    from: '38',
    to: '42',
  },
  {
    '': '8',
    target: 'Saul',
    rid: '1014458',
    id: '1014458:1',
    text: 'Saul is the best restaurant on Smith Street and in Brooklyn.',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'positive',
    from: '0',
    to: '4',
  },
]

const newData = data.reduce((acc, cur) => {
  const key = cur['']
  delete cur['']
  cur.number = key
  cur.keywords = ''
  return Object.assign({ [key]: cur }, acc)
}, {})

const columns = Object.keys(newData[0]).reduce(
  (acc, cur) => Object.assign({ [cur]: cur }, acc),
  {}
)

const nnData = []
Object.keys(newData).map(key => nnData.push(newData[key]))

const fkdata = {
  0: {
    target: 'place',
    rid: '1004293',
    id: '1004293:0',
    text:
      'Judging from previous posts this used to be a good place, but not any longer.',
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
    text:
      'We, there were four of us, arrived at noon - the place was empty - and the staff acted like we were imposing on them and they were very rude.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '75',
    to: '80',
    number: '1',
    keywords: '',
  },
  2: {
    target: 'NULL',
    rid: '1004293',
    id: '1004293:2',
    text:
      'They never brought us complimentary noodles, ignored repeated requests for sugar, and threw our dishes on the table.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '0',
    to: '0',
    number: '2',
    keywords: '',
  },
  3: {
    target: 'food',
    rid: '1004293',
    id: '1004293:3',
    text: 'The food was lousy - too sweet or too salty and the portions tiny.',
    category_first: 'FOOD',
    category_second: 'QUALITY',
    polarity: 'negative',
    from: '4',
    to: '8',
    number: '3',
    keywords: '',
  },
  4: {
    target: 'portions',
    rid: '1004293',
    id: '1004293:3',
    text: 'The food was lousy - too sweet or too salty and the portions tiny.',
    category_first: 'FOOD',
    category_second: 'STYLE_OPTIONS',
    polarity: 'negative',
    from: '52',
    to: '60',
    number: '4',
    keywords: '',
  },
  5: {
    target: 'NULL',
    rid: '1004293',
    id: '1004293:4',
    text: 'After all that, they complained to me about the small tip.',
    category_first: 'SERVICE',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '0',
    to: '0',
    number: '5',
    keywords: '',
  },
  6: {
    target: 'place',
    rid: '1004293',
    id: '1004293:5',
    text: 'Avoid this place!',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'negative',
    from: '11',
    to: '16',
    number: '6',
    keywords: '',
  },
  7: {
    target: 'food',
    rid: '1014458',
    id: '1014458:0',
    text:
      'I have eaten at Saul, many times, the food is always consistently, outrageously good.',
    category_first: 'FOOD',
    category_second: 'QUALITY',
    polarity: 'positive',
    from: '38',
    to: '42',
    number: '7',
    keywords: '',
  },
  8: {
    target: 'Saul',
    rid: '1014458',
    id: '1014458:1',
    text: 'Saul is the best restaurant on Smith Street and in Brooklyn.',
    category_first: 'RESTAURANT',
    category_second: 'GENERAL',
    polarity: 'positive',
    from: '0',
    to: '4',
    number: '8',
    keywords: '',
  },
}

generateCsvFile(fkdata).then(() => console.log('succ'))

// csv.stringify(
//   nnData,
//   {
//     delimiter: ',',
//     header: true,
//     columns,
//   },
//   (_, output) => {
//     console.log(output)
//   }
// )

// console.log(newData)
