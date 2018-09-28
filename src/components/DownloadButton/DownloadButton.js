import React from 'react'
import axios from 'axios'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import cx from 'classnames'
import propsToImmutable from 'hocs/propsToImmutable'
import { selectInitialData, selectAllKeywords } from 'selectors/selectCsvData'
import config from '../../config'
import styles from './DownloadButton.scss'

class DownloadButton extends React.Component {
  componentWillMount() {}

  handleOnClick() {
    const { initialData } = this.props

    // eslint-disable-next-line
    // Object.keys(keywords).map(
    //   item => (initialData[item].keywords = keywords[item]))

    // axios.post(`${config.backendURL}/generate_csv`, initialData)

    axios({
      method: 'post',
      url: `${config.backendURL}/generate_csv`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: initialData,
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
    }),
    null
  ),
  propsToImmutable
)(DownloadButton)
