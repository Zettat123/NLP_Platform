import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Input } from 'antd'
import propsToImmutable from 'hocs/propsToImmutable'
import { updateRow } from 'actions/csvData'
import {
  selectRow,
  selectKeywords,
  selectNotKeywords,
} from 'selectors/selectCsvData'
import TextSelector from './TextSelector'
import styles from './ProcessRow.scss'

class ProcessRow extends React.Component {
  handleKeywordsInputOnChange(e) {
    const currentValue = e.target.value

    const { updateRow, data: { number } } = this.props
    updateRow(number, 'keywords', currentValue)
  }

  addWordToKeywords(content, type) {
    const { keywords: keywordsValue } = this.props
    const { updateRow, data: { number } } = this.props

    let trimmedWord = ''
    if (type === 1) {
      // Get word by click
      const patt = /\W+/
      trimmedWord = content.replace(patt, '')
    } else if (type === 2) {
      // Get words from selection
      const patt = /\n/g
      trimmedWord = content.replace(patt, ' ')
    }

    if (trimmedWord === '') return

    const delimiter = ';'
    const currentValue =
      keywordsValue === ''
        ? trimmedWord
        : `${keywordsValue}${delimiter}${trimmedWord}`

    updateRow(number, 'keywords', currentValue)
  }

  handleOnChangeNotKeywordsValue(newValue) {
    const { updateRow, data: { number } } = this.props

    updateRow(number, 'not_keywords', newValue)
  }

  render() {
    const {
      className,
      data,
      keywords: keywordsValue,
      not_keywords: notKeywordsValue,
    } = this.props

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
            number={number}
            text={text}
            updateKeywords={(content, type) =>
              this.addWordToKeywords(content, type)
            }
          />
        </div>
        <div className={cx(styles.processItem, styles.keywords)}>
          <Input
            value={keywordsValue}
            onChange={e => this.handleKeywordsInputOnChange(e)}
          />
        </div>
        <div className={cx(styles.processItem, styles.not_keywords)}>
          <Input
            value={notKeywordsValue}
            onChange={e => this.handleOnChangeNotKeywordsValue(e.target.value)}
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
  connect(
    (state, props) => ({
      data: selectRow(state, props.dataKey),
      keywords: selectKeywords(state, props.dataKey),
      not_keywords: selectNotKeywords(state, props.dataKey),
    }),
    {
      updateRow,
    }
  ),
  propsToImmutable
)(ProcessRow)
