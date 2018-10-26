import React from 'react'
import axios from 'axios'
import { Button } from 'antd'
import cx from 'classnames'
import config from '../../config'
import styles from './DownloadButton.scss'

class DownloadButton extends React.Component {
  componentWillMount() {}

  handleOnClick() {
    const { finalData } = this.props

    axios({
      method: 'post',
      url: `${config.backendURL}/generate_csv`,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: finalData,
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

export default DownloadButton
