import React, { Component }   from 'react';
import Market from '../../../market/src/App';
import ChatWidget                 from '../Component/Widget';
import Footer                 from '../Component/Footer';
import Header                 from '../Component/Header';
import "../../../market/src/App.css"

//this component renders the market page acquired from public/market/src/app

class MarketPage extends Component {
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
        <Market />
        <Footer />
      </div>
        <ChatWidget />
    </div>
    );
  }
}

export default MarketPage;