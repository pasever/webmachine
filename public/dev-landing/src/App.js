import React, { Component } from 'react';
import { BrowserRouter as 
  Router,
  Route 
} from "react-router-dom";
import './App.css';
import Banner from './components/Banner';
import Docs from './components/Docs';


class App extends Component {
  render() {
    return (
      // Wrap entire application with <Router> at
      // root level to allow for nested routing at
      // various levels.
      <Router>
        <div id='developer-landing-page'>
          <Route exact path='/' component={Banner} />
          <Route path='/docs' component={Docs} />
        </div>
      </Router>
    );
  }
}

export default App;
