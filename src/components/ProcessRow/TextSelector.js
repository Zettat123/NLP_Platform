import React from 'react'
import styles from './TextSelector.scss'

class TextSelector extends React.Component {
  componentWillMount() {
    // TODO
  }

  render() {
    const { text, clickCallback } = this.props

    const words = text.split(' ')

    return (
      <div className={styles.root}>
        {words.map((word, index) => (
          <button
            className={styles.wordItem}
            // TODO: Find proper key
            // eslint-disable-next-line react/no-array-index-key
            key={`word-${index}`}
            onClick={() => clickCallback(word)}
          >
            {word}
          </button>
        ))}
      </div>
    )
  }
}

export default TextSelector
