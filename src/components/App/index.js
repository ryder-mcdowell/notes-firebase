import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import firebase from '../Firebase';
import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import Dashboard from '../Dashboard';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  state = { authenticated: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState({ authenticated: true })
        : this.setState({ authenticated: false })
    });
  }

  render() {
    return (
      <Router>
        <div class="container">
          <Navigation authenticated={this.state.authenticated} />

          <Switch>
            <Route exact path={ROUTES.LANDING} render={() => this.state.authenticated ? <Redirect to={ROUTES.DASHBOARD} /> : <LandingPage />} />
            <ProtectedRoute authenticated={this.state.authenticated} path={ROUTES.LANDING} component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
