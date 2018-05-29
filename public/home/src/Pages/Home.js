import React, { Component }   from 'react';
import About                  from '../Component/About';
import Contact                from '../Component/Contact';
import Footer                 from '../Component/Footer';
import Header                 from '../Component/Header';
import Jumbotron              from '../Component/Jumbotron';
import Portfolio              from '../Component/Portfolio';
import Market                 from '../Component/Market';
import Testimonials           from '../Component/Testimonials';
import { Switch, Route }      from 'react-router-dom'
import ChatWidget                 from '../Component/Widget';

class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        portfolioData: {},
        profile: {}
      }
    }

    
  componentWillMount() {
    //this function sets the user information if they are logged in
    const { userProfile, getProfile } = this.props.auth;
    getProfile((err, profile) => {
      this.setState({ profile });
    });
  }
    

  //render each component of the home page
  render() {
    return (
      <div>
        <div className="App">      
          <Jumbotron data={this.props.data.main} />
          <About data={this.props.data.main} />
          <Market data={this.props.data.market} />
          <Portfolio data={this.props.data.portfolio} />
          <Testimonials  data={this.props.data.testimonials} />
          <Contact data={this.props.data.main} />
        </div>
        <ChatWidget />
      </div>
    );
  }
}

export default Home;