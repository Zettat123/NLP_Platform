import React, { PropTypes } from 'react'
import { Route, Router, IndexRoute } from 'react-router'
import App from 'components/App'
import HomePage from 'pages/HomePage'
import AboutPage from 'pages/AboutPage'
import NotFoundPage from 'pages/NotFoundPage'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
)

Routes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
}

export default Routes
