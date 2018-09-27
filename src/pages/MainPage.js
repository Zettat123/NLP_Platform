import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Spin } from 'antd'
import propsToImmutable from 'hocs/propsToImmutable'
import { initialize } from 'actions/csvData'
import { selectData } from 'selectors/selectCsvData'
import FileInput from 'components/FileInput'
import TableHead from 'components/TableHead'
import ProcessRow from 'components/ProcessRow'
import config from '../config'
import styles from './MainPage.scss'

class MainPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isUploading: false,
    }
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
    }).then(({ data }) => {
      initialize(data)
      this.setState({ isUploading: false })
    })
  }

  render() {
    const { isUploading } = this.state
    const { csvData } = this.props

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
        {Object.keys(csvData).map(item => (
          <ProcessRow key={item} data={csvData[item]} />
        ))}
      </div>
    )
  }
}

export default compose(
  connect(
    (state, props) => ({
      csvData: selectData(state, props),
    }),
    { initialize }
  ),
  propsToImmutable
)(MainPage)
