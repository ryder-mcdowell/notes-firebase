import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import LandingPage from '../LandingPage';
import Home from '../Home';

import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} render={() => this.props.authenticated ? <Redirect to="/home" /> : <LandingPage />} />
          <ProtectedRoute authenticated={this.props.authenticated} path={ROUTES.LANDING} component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default Navigation;
