import React, { Component } from 'react';
import './styles.css';
import firebase from '../Firebase';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="userInfoContainer">
          <h1>{firebase.auth().currentUser.email}</h1>
        </div>
      </div>
    );
  }
}

export default Dashboard;
