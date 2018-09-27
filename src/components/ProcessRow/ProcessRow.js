import React from 'react'
import cx from 'classnames'
import { Input } from 'antd'
import TextSelector from './TextSelector'
import styles from './ProcessRow.scss'

// const testdata = {
//   category_first: 'RESTAURANT',
//   category_second: 'MISCELLANEOUS',
//   from: '51',
//   id: '1004293:0',
//   key: '0',
//   polarity: 'negative',
//   rid: '1004293',
//   target: 'place',
//   text: 'Judging from previous posts this used to be a good place',
//   to: '56',
// }

class ProcessRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keywordsValue: '',
    }
  }

  componentWillMount() {
    // TODO
  }

  addWordToKeywords(word) {
    const { keywordsValue } = this.state

    const reg = /\W+/
    const trimmedWord = word.replace(reg, '')

    if (trimmedWord === '') return

    const delimiter = ';'

    this.setState({
      keywordsValue:
        keywordsValue === ''
          ? trimmedWord
          : `${keywordsValue}${delimiter}${trimmedWord}`,
    })
  }

  render() {
    const { className, data } = this.props
    const { keywordsValue } = this.state
    const {
      key,
      text,
      target,
      category_first: categoryFirst,
      category_second: categorySecond,
      polarity,
    } = data

    return (
      <div className={cx(styles.root, className)}>
        <div className={cx(styles.processItem, styles.no)}>{key}</div>
        <div className={cx(styles.processItem, styles.text)}>
          <TextSelector
            text={text}
            clickCallback={word => this.addWordToKeywords(word)}
          />
        </div>
        <div className={cx(styles.processItem, styles.keywords)}>
          <Input
            value={keywordsValue}
            onChange={e => this.setState({ keywordsValue: e.target.value })}
          />
        </div>
        <div className={cx(styles.processItem, styles.target)}>{target}</div>
        <div className={cx(styles.processItem, styles.category_first)}>
          {categoryFirst}
        </div>
        <div className={cx(styles.processItem, styles.category_second)}>
          {categorySecond}
        </div>
        <div className={cx(styles.processItem, styles.polarity)}>
          {polarity}
        </div>
      </div>
    )
  }
}

export default ProcessRow
