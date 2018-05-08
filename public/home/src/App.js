////////////////////////////////////////////////////////////////////////
/////////////////      homepage and chat widget       //////////////////
/////////////////    Connecting Business to CUI     ///////////////////
//////////////////////////////////////////////////////////////////////

import React, { Component }   from 'react';
import Footer                 from './Component/Footer';
import Header                 from './Component/Header';
import Main                   from './Pages/Main';
import Testimonials           from './Component/Testimonials';
import { Switch, Route } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import './App.css';
import Auth from './Pages/Auth/Auth';

const auth = new Auth();


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioData: {},
      openModal: false,
    }
    this.onClose = this.onClose.bind(this);
  }

//retrieve portfolio data object to fill page information
  getPortfolioData(){
    //Ajax request
    fetch('/home/static/portfolioData.json')
      .then(r => r.json())
      .then(json => {
        this.db = json
        this.setState({  portfolioData: json  });
      }
    )
  }

  onClose() {
    this.setState({ openModal: false });
  }

  componentDidMount(){
    this.getPortfolioData();
    if(auth.isAuthenticated()) {
      this.setState({ openModal: true });
    }
  }



  render() {
    return (
      <div>
      <div className="App">
        <Modal open={this.state.openModal} className="modal" onClose={this.onClose } center>
          <h2>Welcome back, friend!</h2>
          <p>We see you're already logged in!<br />
          We can take you directly to your <a href="/dashboarD"><strong>Dashboard</strong></a> if you'd like?</p>
          
          <button className="btn btn-secondary btn-lg" onClick={ this.onClose }>No</button>
          <form action="/dashboard" method="GET" className="floating-form">
          { "   " }<button className="btn btn-primary btn-lg">Yes</button>
          </form>
            
          
        </Modal>
        <Header data={this.state.portfolioData.main} auth={auth}/>
        <Main data={this.state.portfolioData}/>
        <Footer/>
      </div>
    </div>
    );
  }
}

export default App;
