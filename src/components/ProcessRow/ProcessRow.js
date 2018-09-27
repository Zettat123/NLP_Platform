/*eslint-disable*/
import React from 'react'
import cx from 'classnames'
import TextSelector from './TextSelector'
import styles from './ProcessRow.scss'

const testdata = {
  category_first: 'RESTAURANT',
  category_second: 'GENERAL',
  from: '51',
  id: '1004293:0',
  key: '0',
  polarity: 'negative',
  rid: '1004293',
  target: 'place',
  text: 'Judging from previous posts this used to be a good place',
  to: '56',
}

class ProcessRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyWordsValue: '',
    }
  }

  componentWillMount() {
    // TODO
  }

  render() {
    const { className } = this.props
    const {
      key,
      text,
      target,
      category_first,
      category_second,
      polarity,
    } = testdata

    return (
      <div className={cx(styles.root, className)}>
        <div className={cx(styles.processItem, styles.no)}>{key}</div>
        <div className={cx(styles.processItem, styles.text)}>
          <TextSelector text={text} />
        </div>
        <div className={cx(styles.processItem, styles.keywords)}>KEYWORDS</div>
        <div className={cx(styles.processItem, styles.target)}>{target}</div>
        <div className={cx(styles.processItem, styles.category_first)}>
          {category_first}
        </div>
        <div className={cx(styles.processItem, styles.category_second)}>
          {category_second}
        </div>
        <div className={cx(styles.processItem, styles.polarity)}>
          {polarity}
        </div>
      </div>
    )
  }
}

export default ProcessRow
