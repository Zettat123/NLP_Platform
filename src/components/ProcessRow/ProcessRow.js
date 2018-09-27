import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Input } from 'antd'
import propsToImmutable from 'hocs/propsToImmutable'
import { updateRow } from 'actions/csvData'
import TextSelector from './TextSelector'
import styles from './ProcessRow.scss'

class ProcessRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keywordsValue: '',
    }
  }

  shouldComponentUpdate(_, nextState) {
    const { keywordsValue } = this.state
    const { keywordsValue: nextKeywordsValue } = nextState

    const { updateRow, data: { number } } = this.props

    if (keywordsValue === nextKeywordsValue) {
      return false
    }
    updateRow(number, 'keywords', nextKeywordsValue)
    return true
  }

  handleKeywordsInputOnChange(e) {
    const currentValue = e.target.value

    this.setState({ keywordsValue: currentValue })
  }

  addWordToKeywords(word) {
    const { keywordsValue } = this.state

    const reg = /\W+/
    const trimmedWord = word.replace(reg, '')

    if (trimmedWord === '') return

    const delimiter = ';'
    const currentValue =
      keywordsValue === ''
        ? trimmedWord
        : `${keywordsValue}${delimiter}${trimmedWord}`

    this.setState({ keywordsValue: currentValue })
  }

  render() {
    const { className, data } = this.props
    const { keywordsValue } = this.state
    const {
      number,
      text,
      target,
      category_first: categoryFirst,
      category_second: categorySecond,
      polarity,
    } = data

    return (
      <div className={cx(styles.root, className)}>
        <div className={cx(styles.processItem, styles.no)}>{number}</div>
        <div className={cx(styles.processItem, styles.text)}>
          <TextSelector
            text={text}
            clickCallback={word => this.addWordToKeywords(word)}
          />
        </div>
        <div className={cx(styles.processItem, styles.keywords)}>
          <Input
            value={keywordsValue}
            onChange={e => this.handleKeywordsInputOnChange(e)}
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

export default compose(
  connect(null, {
    updateRow,
  }),
  propsToImmutable
)(ProcessRow)
