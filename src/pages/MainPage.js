import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Spin, Modal } from 'antd'
import propsToImmutable from 'hocs/propsToImmutable'
import { initialize } from 'actions/csvData'
import { selectCsvData } from 'selectors/selectCsvData'
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
      timeoutId: '',
    }
  }

  checkHash(csvData, csvFileHash) {
    const { csvFileHash: oldHash, timeoutId } = this.state
    const { initialize } = this.props

    // eslint-disable-next-line
    const csvDataFromLocalStorage = JSON.parse(
      localStorage.getItem(csvFileHash))

    if (csvDataFromLocalStorage) {
      // eslint-disable-next-line
      console.log('This file has been loaded')
      Modal.confirm({
        title: '提示',
        content: `该 csv 文件曾被处理过, 最后一次自动保存时间为:${
          csvDataFromLocalStorage.latestUpdateTime
        } 是否载入最后一次保存的数据?`,
        onCancel: () => {
          initialize(csvData)
          this.setState({ isUploading: false, keysArray: Object.keys(csvData) })
        },
        onOk: () => {
          initialize(csvDataFromLocalStorage.data)
          this.setState({ isUploading: false, keysArray: Object.keys(csvData) })
        },
      })
    } else {
      // eslint-disable-next-line
      console.log('This is a new file')
      initialize(csvData)
      this.setState({ isUploading: false, keysArray: Object.keys(csvData) })
    }

    if (oldHash !== csvFileHash) {
      clearTimeout(timeoutId)
      const newTimeoutId = window.setTimeout(() => {
        localStorage.setItem(
          csvFileHash,
          JSON.stringify({
            data: this.generateFinalData(),
            latestUpdateTime: Date(Date.now()).toLocaleString(),
          })
        )
      }, 60000)
      this.setState({ timeoutId: newTimeoutId, csvFileHash })
    }
  }

  generateFinalData() {
    const { csvData } = this.props

    const finalData = Object.assign({}, csvData)

    return finalData
  }

  uploadCSVFile(file) {
    this.setState({ isUploading: true })

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
      this.checkHash(csvData, hash)
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
      csvData: selectCsvData(state, props),
    }),
    { initialize }
  ),
  propsToImmutable
)(MainPage)
