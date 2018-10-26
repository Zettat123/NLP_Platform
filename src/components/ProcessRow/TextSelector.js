import React from 'react'
import styles from './TextSelector.scss'

class TextSelector extends React.Component {
  handleOnKeyDown(e) {
    const { updateKeywords } = this.props
    if (e.which === 16) {
      // Press F
      updateKeywords(window.getSelection().toString(), 2)
    }
  }

  render() {
    const { number, text, updateKeywords } = this.props

    const words = text.split(' ')

    return (
      // eslint-disable-next-line
      <div
        className={styles.root}
        onKeyDown={e => this.handleOnKeyDown(e)}
        tabIndex={number}
      >
        {words.map((word, index) => (
          // eslint-disable-next-line
          <span
            className={styles.wordItem}
            // TODO: Find proper key
            // eslint-disable-next-line react/no-array-index-key
            key={`word-${index}`}
            onClick={() => updateKeywords(word, 1)}
          >
            {word}
          </span>
        ))}
      </div>
    )
  }
}

export default TextSelector
