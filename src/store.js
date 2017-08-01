/**
 * Create the store with asynchronously loaded reducers
 */
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

let cachedStore = {}

const configStore = (initialState = {}, history) => {
  const middlewares = [
    thunkMiddleware,
    createLogger(),
    routerMiddleware(history),
    reduxPromiseMiddleware(),
  ]
  const enhancers = [applyMiddleware(...middlewares), devtools()]
  const store = createStore(
    createReducer({}),
    fromJS(initialState),
    compose(...enhancers)
  )

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    const nextReducers = createReducer(store.asyncReducers)

    store.replaceReducer(nextReducers)
  }
  // Initialize it with no other reducers
  store.asyncReducers = {}

  cachedStore = store

  return store
}

export const injectAsyncReducer = (name, asyncReducer) => {
  cachedStore.asyncReducers[name] = asyncReducer
  cachedStore.replaceReducer(createReducer(cachedStore.asyncReducers))
}

export default configStore
