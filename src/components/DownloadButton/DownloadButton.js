import React from 'react'
import axios from 'axios'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import cx from 'classnames'
import propsToImmutable from 'hocs/propsToImmutable'
import {
  selectInitialData,
  selectAllKeywords,
  selectAllNotKeywords,
} from 'selectors/selectCsvData'
import config from '../../config'
import styles from './DownloadButton.scss'

class DownloadButton extends React.Component {
  componentWillMount() {}

  handleOnClick() {
    const { initialData, keywords, not_keywords: notKeywords } = this.props

    // eslint-disable-next-line
    Object.keys(keywords).map(
      item => (initialData[item].keywords = keywords[item]))

    // eslint-disable-next-line
    Object.keys(notKeywords).map(
      item => (initialData[item].not_keywords = notKeywords[item]))

    axios({
      method: 'post',
      url: `${config.backendURL}/generate_csv`,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: initialData,
    }).then(({ data: filePath }) => {
      const aElement = document.createElement('a')
      aElement.setAttribute(
        'href',
        `${config.backendURL}/download_csv?filePath=${filePath}`
      )
      aElement.click()
    })
  }

  render() {
    const { className } = this.props
    return (
      <div className={cx(styles.root, className)}>
        <Button type="primary" onClick={() => this.handleOnClick()}>
          Generate & Download
        </Button>
      </div>
    )
  }
}

export default compose(
  connect(
    (state, props) => ({
      initialData: selectInitialData(state, props),
      keywords: selectAllKeywords(state, props),
      not_keywords: selectAllNotKeywords(state, props),
    }),
    null
  ),
  propsToImmutable
)(DownloadButton)
