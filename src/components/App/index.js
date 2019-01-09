import React, { Component } from 'react';
import firebase from '../Firebase';
import Navigation from '../Navigation';

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
      <Navigation authenticated={this.state.authenticated} />
    );
  }
}

export default App;
