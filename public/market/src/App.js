

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Routes               from './routes';
import './App.css';

export default class App extends Component {

  componentDidMount() {
    let ls = window.localStorage;
    let id_token = ls.getItem('id_token');
    if (id_token == null) {
      console.log('no user authenticated');
    } else {
      console.log(id_token);
    }
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