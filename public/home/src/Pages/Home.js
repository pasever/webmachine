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
        portfolioData: {}
      }
    }

    


render() {

    
    console.log(this.state.portfolioData);
    return (
      <div>
      <div className="App">
        <Header data={this.props.data.main} />        
        <Jumbotron data={this.props.data.main} />
        <About data={this.props.data.main} />
        <Market data={this.props.data.market} />
        <Portfolio data={this.props.data.portfolio} />
        <Testimonials  data={this.props.data.testimonials} />
        <Contact data={this.props.data.main} />
        <Footer />
      </div>
        <ChatWidget />
    </div>
    );
  }
}

export default Home;