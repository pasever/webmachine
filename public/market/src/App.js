

import React, { Component } from 'react';
import Routes               from './routes';
import Auth from '../../home/src/Pages/Auth/Auth'
import './App.css';

export default class App extends Component {

  componentWillMount() {
    let auth = new Auth();
    if (!auth.isAuthenticated())
      auth.login()
  }

  render() {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1 className="header-title">Marketplace</h1>
        </header>
        <main className="app-content">
          <Routes />
        </main>
      </div>
    );
  };
};