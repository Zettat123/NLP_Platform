import 'babel-polyfill'
import 'styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import generateConfiguredStore from './store'
import { history } from './routes/index'
import App from './components/App'

const initialState = {}
const store = generateConfiguredStore(initialState, history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
