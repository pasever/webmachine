///////////////////////////////////////////////////////////////////////
////////////////////      Agents Library       ////////////////////////
///////////////////////////////////////////////////////////////////////

"use strict";

import React, { Component } from "react";
import Routes from './routes';
import "./App.css";


class App extends Component {
  
  render() {
    return (
      <div>
        <div className="app-container">
         
          <header className="app-header">
            <h1 className="header-title">Agents</h1>
          </header>
          
          <main className="app-content">  
            <Routes />                             
          </main>
        
        </div>    
      </div>
    );
  } 
}

export default App;
