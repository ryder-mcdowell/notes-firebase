import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage';
import Home from '../Home';

import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} render={() => this.props.authenticated ? <Home /> : <Redirect to={ROUTES.LANDING} />} />
        </Switch>
      </Router>
    );
  }
}

export default Navigation;
