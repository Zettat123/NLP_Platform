import React from 'react'
import cx from 'classnames'
import styles from './TableHead.scss'

const columns = [
  { name: 'no', displayName: 'No.' },
  { name: 'text' },
  { name: 'keywords' },
  { name: 'target' },
  { name: 'category_first' },
  { name: 'category_second' },
  { name: 'polarity' },
]

const TableHead = () => (
  <div className={styles.root}>
    {columns.map(item => (
      <div className={cx(styles.headItem, styles[item.name])}>
        {item.displayName ? item.displayName : item.name}
      </div>
    ))}
    {/* <div className={cx(styles.headItem, styles.no)}>No.</div>
    <div className={cx(styles.headItem, styles.text)}>text</div>
    <div className={cx(styles.headItem, styles.keywords)}>keywords</div> */}
  </div>
)

export default TableHead
