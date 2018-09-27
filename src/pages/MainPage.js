import React from 'react'
import axios from 'axios'
import { Spin } from 'antd'
import FileInput from 'components/FileInput'
import TableHead from 'components/TableHead'
import ProcessRow from 'components/ProcessRow'
import config from '../config'
import styles from './MainPage.scss'

class MainPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      csvData: [],
      isUploading: false,
    }
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
    }).then(({ data }) =>
      this.setState({ csvData: data }, () =>
        this.setState({ isUploading: false })))
  }

  render() {
    const { csvData, isUploading } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.fileUploadBar}>
          <FileInput
            className={styles.fileInput}
            uploadFile={file => this.uploadCSVFile(file)}
          />
          <Spin className={styles.spin} spinning={isUploading} />
        </div>

        <TableHead />
        {csvData.map(item => <ProcessRow key={item.key} data={item} />)}
      </div>
    )
  }
}

export default MainPage
