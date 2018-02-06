import React from 'react'
import { Provider } from 'react-redux'
import generateConfiguredStore from '../store'
import Routes, { history } from '../routes/index'

const initialState = {}
const store = generateConfiguredStore(initialState, history)

const App = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
)

export default App
