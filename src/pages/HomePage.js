import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import styles from './HomePage.scss'

export default () => (
  <div>
    <div className={cx(styles.introduction, 'container')}>
      This is the HomePage
    </div>
    <Link to={'/about'}>About Page</Link>
  </div>
)
