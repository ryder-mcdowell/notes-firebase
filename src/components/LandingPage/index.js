import React, { Component } from 'react';
import './styles.css';
import { withRouter } from 'react-router-dom';
import firebase from '../Firebase';

import * as ROUTES from '../../constants/routes';

class LandingPage extends Component {
  state = { email: '', password: '', error: '' };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSignUpButton(event) {
    const { email, password } = this.state;
    event.preventDefault();

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
  }

  onSignInButton(event) {
    const { email, password } = this.state;
    event.preventDefault();

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    return (
      <div className="container">
        <div className ="authContainer">
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="email"
          />
          <br />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <br />
          <div className="buttonsContainer">
            <button onClick={this.onSignUpButton.bind(this)}>Sign Up</button>
            <button onClick={this.onSignInButton.bind(this)}>Sign In</button>
          </div>

          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
