import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import MainPage from '../pages/MainPage'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'

export const history = createBrowserHistory()

const Routes = () => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </ConnectedRouter>
)

export default Routes
