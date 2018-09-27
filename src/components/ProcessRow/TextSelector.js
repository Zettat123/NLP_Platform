/*eslint-disable*/
import React from 'react'
import styles from './TextSelector.scss'

class TextSelector extends React.Component {
  componentWillMount() {
    // TODO
  }

  render() {
    const { text } = this.props

    const words = text.split(' ')
    console.log(words)
    return (
      <div className={styles.root}>
        {words.map(word => (
          <div className={styles.wordItem} key={word}>
            {word}
          </div>
        ))}
      </div>
    )
  }
}

export default TextSelector
