import React from 'react'
import TableHead from 'components/TableHead'
import styles from './MainPage.scss'

class MainPage extends React.Component {
  componentWillMount() {
    // eslint-disable-next-line
    console.log('Mounted')
  }

  render() {
    return (
      <div className={styles.root}>
        <TableHead />
      </div>
    )
  }
}

export default MainPage
