/*eslint-disable*/
import React from 'react'
import cx from 'classnames'
import { Modal, Icon } from 'antd'
import styles from './FileInput.scss'

class FileInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
    }
  }

  isFileValid = fileName => fileName.endsWith('.csv')

  showErrorModal() {
    Modal.error({
      title: 'File Extension Error',
      content: 'Only .csv file is allowed',
    })
  }

  handleSelectFile(e) {
    const currentFile = e.target.files[0]
    if (this.isFileValid(currentFile.name)) {
      this.setState({
        file: currentFile,
      })
    } else {
      this.showErrorModal()
    }
  }

  uploadFile() {
    const { file } = this.state
    const { uploadFile } = this.props
    uploadFile(file)
  }

  deleteFile() {
    this.setState({ file: null })
  }

  render() {
    const { className, disabled } = this.props
    const { file } = this.state

    return (
      <div className={cx(className, styles.root)}>
        <div className={cx(styles.cover, { [styles.disabled]: disabled })} />
        {file === null ? (
          <button
            className={cx(styles.button, styles.select)}
            onChange={e => this.handleSelectFile(e)}
          >
            Select<Icon className={styles.icon} type="file-add" />
            <input className={styles.invisibleFileInput} type="file" />
          </button>
        ) : (
          <div className={styles.buttonGroup}>
            <div
              className={styles.deleteButton}
              onClick={() => this.deleteFile()}
            >
              <Icon type="close-circle" />
            </div>
            <button
              className={cx(styles.button, styles.upload)}
              onClick={() => this.uploadFile()}
            >
              Upload<Icon className={styles.icon} type="upload" />
            </button>
          </div>
        )}
        <div className={styles.fileName}>
          {file ? file.name : 'Please upload the .csv file'}
        </div>
      </div>
    )
  }
}

export default FileInput
