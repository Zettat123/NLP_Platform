import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './MainPage.scss'

const MainPage = () => (
  <div>
    <div className={cx(styles.text)}>This is MainPage</div>
    <Link to="/about">ABOUT</Link>
  </div>
)

export default MainPage
