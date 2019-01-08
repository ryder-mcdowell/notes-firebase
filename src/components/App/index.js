import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import Home from '../Home';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.HOME} component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
