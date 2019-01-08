import React, { Component } from 'react';
import './styles.css';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', error: '' };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    this.props.history.push(ROUTES.HOME);
  }

  render() {
    const {
      username,
      password,
      error
    } = this.state;

    return (
      <div className="container">
        <div className ="authContainer">
          <form onSubmit={this.onSubmit}>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="username"
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
              <button type="submit">Sign Up</button>
              <button type="submit">Sign In</button>
            </div>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
