import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Spin } from 'antd'
import propsToImmutable from 'hocs/propsToImmutable'
import { initialize } from 'actions/csvData'
import {
  selectInitialData,
  selectAllKeywords,
  selectAllNotKeywords,
} from 'selectors/selectCsvData'
import FileInput from 'components/FileInput'
import TableHead from 'components/TableHead'
import ProcessRow from 'components/ProcessRow'
import DownloadButton from 'components/DownloadButton'
import config from '../config'
import styles from './MainPage.scss'

class MainPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keysArray: [],
      isUploading: false,
      csvFileHash: '',
    }
  }

  checkHash() {
    const { csvFileHash } = this.state

    if (localStorage.getItem(csvFileHash)) {
      // eslint-disable-next-line
      console.log('This file has been loaded')
    } else {
      // eslint-disable-next-line
      console.log('This is a new file')
      window.setTimeout(() => {
        localStorage.setItem(csvFileHash, this.generateFinalData())
      }, 60000)
    }
  }

  generateFinalData() {
    const { initialData, keywords, not_keywords: notKeywords } = this.props

    const finalData = Object.assign({}, initialData)

    // eslint-disable-next-line
    Object.keys(keywords).map(
      item => (finalData[item].keywords = keywords[item]))

    // eslint-disable-next-line
    Object.keys(notKeywords).map(
      item => (finalData[item].not_keywords = notKeywords[item]))

    return finalData
  }

  uploadCSVFile(file) {
    this.setState({ isUploading: true })
    const { initialize } = this.props

    const formData = new FormData()
    formData.append('file', file)

    axios({
      method: 'post',
      url: `${config.backendURL}/get_csv_objects`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }).then(({ data: { csv_data: csvData, hash } }) => {
      initialize(csvData)
      this.setState({ isUploading: false, keysArray: Object.keys(csvData) })
      this.setState({ csvFileHash: hash })
      this.checkHash()
    })
  }

  render() {
    const { isUploading, keysArray } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.fileUploadBar}>
          <FileInput
            className={styles.fileInput}
            uploadFile={file => this.uploadCSVFile(file)}
          />
          <div className={styles.spin}>
            <Spin spinning={isUploading} />
          </div>
          <DownloadButton finalData={this.generateFinalData()} />
        </div>

        <TableHead />
        {keysArray.map(item => <ProcessRow key={item} dataKey={item} />)}
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
    { initialize }
  ),
  propsToImmutable
)(MainPage)
