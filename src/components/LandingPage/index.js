import React, { Component } from 'react';
import './styles.css';
import { withRouter } from 'react-router-dom';
import firebase, { GoogleAuthProvider } from '../Firebase';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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

  onGoogleButton(event) {
    event.preventDefault();

    firebase
    .auth()
    .signInWithPopup(GoogleAuthProvider)
    .then(user => {
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    })
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
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="email"
          />
          <br />
          <Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="password"
          />
          <br />
          <div className="buttonsContainer">
            <Button onClick={this.onSignUpButton.bind(this)} variant="outlined">Sign Up</Button>
            <Button onClick={this.onSignInButton.bind(this)} variant="outlined">Sign In</Button>
          </div>
          <Button onClick={this.onGoogleButton.bind(this)} variant="outlined">Sign In With Google</Button>

          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
