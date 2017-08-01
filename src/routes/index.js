import React, { PropTypes } from 'react'
import { Route, Router } from 'react-router'
import lazyLoad from 'helpers/lazyLoad'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route
      path="/"
      getComponent={lazyLoad(() => System.import('pages/HomePage'))}
    />
    <Route
      path="/about"
      getComponent={lazyLoad(() => System.import('pages/AboutPage'))}
    />
    <Route
      path="*"
      getComponent={lazyLoad(() => System.import('pages/NotFoundPage'))}
    />
  </Router>
)

Routes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
}

export default Routes
