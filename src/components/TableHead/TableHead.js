import React from 'react'
import cx from 'classnames'
import styles from './TableHead.scss'

const columns = [
  { name: 'no', displayName: 'No.' },
  { name: 'text' },
  { name: 'keywords' },
  { name: 'not_keywords' },
  { name: 'target' },
  { name: 'category_first' },
  { name: 'category_second' },
  { name: 'polarity' },
]

const TableHead = () => (
  <div className={styles.root}>
    {columns.map(({ name, displayName }) => (
      <div className={cx(styles.headItem, styles[name])} key={name}>
        {displayName || name}
      </div>
    ))}
  </div>
)

export default TableHead
