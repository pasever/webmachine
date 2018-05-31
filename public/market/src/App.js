

import React, { Component } from 'react';
import Routes               from './routes';
import Auth from '../../home/src/Pages/Auth/Auth'
import LoadingPage from 'Common/LoadingPage';
import './App.css';

const auth = new Auth();

export default class App extends Component {
  state = {
    mounted: false,
  }
  componentWillMount() {
    if (!auth.isAuthenticated()) 
      auth.login('/market');
    else 
      this.setState({ mounted: true });
  }

  render() {
    return (
      <div>
        { !this.state.mounted ? <LoadingPage /> : (
          <div className="app-container">
            <header className="app-header">
              <h1 className="header-title">Marketplace</h1>
            </header>
            <main className="app-content">
              <Routes />
            </main>
          </div>
        )}
      </div>
    );
  };
};