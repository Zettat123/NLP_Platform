import React from 'react'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import configureStore from 'app/store'
import Routes from 'app/routes'
import 'normalize.css'
import 'styles/global.scss'

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS()
  },
})

export default () => (
  <Provider store={store}>
    <Routes history={history} store={store} />
  </Provider>
)
