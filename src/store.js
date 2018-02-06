import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'

// To activate Redux DevTools Extension.
// @see https://github.com/zalmoxisus/redux-devtools-extension#usage
const devTools = window.devToolsExtension || (() => noop => noop)

const generateConfiguredStore = (initialState = {}, history) => {
  const middlewares = [
    thunkMiddleware,
    logger,
    routerMiddleware(history),
    reduxPromiseMiddleware(),
  ]

  const enhencers = [applyMiddleware(...middlewares), devTools()]

  const store = createStore(
    createReducer({}),
    fromJS(initialState),
    compose(...enhencers)
  )

  return store
}

export default generateConfiguredStore
