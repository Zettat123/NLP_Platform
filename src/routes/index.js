import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import MainPage from '../pages/MainPage'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'

export const history = createBrowserHistory()

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
)

export default Routes
