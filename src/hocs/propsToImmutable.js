/**
 * @see https://redux.js.org/docs/recipes/UsingImmutableJS.html
 */
import React from 'react'
import { isImmutable } from 'immutable' // immutable@4.0.0-rc.2

const propsToImmutable = Component => (props) => {
  const propsJS = Object.keys(props).reduce((newProps, key) => {
    const value = props[key]
    return Object.assign({}, newProps, {
      [key]: isImmutable(value) ? value.toJS() : value,
    })
  }, {})

  return <Component {...propsJS} />
}

export default propsToImmutable
