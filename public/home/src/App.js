

////////////////////////////////////////////////////////////////////////
/////////////////      homepage and chat widget       //////////////////
/////////////////    Connecting Business to CUI     ///////////////////
//////////////////////////////////////////////////////////////////////

import React, { Component }   from 'react';
import About                  from './Component/About';
import Contact                from './Component/Contact';
import Footer                 from './Component/Footer';
import Header                 from './Component/Header';
import Jumbotron              from './Component/Jumbotron';
import Portfolio              from './Component/Portfolio';
import Market                 from './Component/Market';
import Testimonials           from './Component/Testimonials';
import { Widget,
         addResponseMessage,
         addLinkSnippet,
         addUserMessage }     from 'react-chat-widget';
import uuidv1                 from 'uuid/v1';
import logo                   from '../../avatar/persona/mark.png'
import config                 from '../../../config'
import './App.css';

// chatwidget elements
let apiProfile = "http://localhost:3000"
let user = "+12123334444"
let platform = "+12125557777"

let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)


// This chat widget issues and api/sms call to the server and is handled via the sms route 
// In addition, the webtoken entered here serves as the unique identifier for org auth and config process
const platformObj =  config.platform()
const origin = config.origin

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
const msgObj = {
  MessageSid: uuidv1(),
  SmsSid:uuidv1(),
  AccountSid: uuidv1(),
  MessagingServiceSid: uuidv1(),
  From: user,
  To: platform,
  Body: "",
  NumMedia: "",
  NumSegments: "",
  MediaContentType: " ",
  MediaUrl: " ",
  FromCity:"Charlotte",
  FromState: "NC",
  FromZip: "28222",
  FromCounty: "USA",
  SmsStatus: "",
  ToCity: "Charlotte",
  ToState: "NC",
  ToZip: "28222",
  ToCountry: "USA",
  AddOns: " ",
  ApiVersion: "v1",
  PostDate: Date.now(),
  ChaoticSid: uuidv1(),
  ChaoticSource: "home",
  Token: undefined
}
//

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioData: {}
    }
  }
   getPortfolioData(){
     //Ajax request
     fetch(origin + '/home/static/portfolioData.json')
      .then(r => r.json())
      .then(json => {
        this.db = json
        this.setState({  portfolioData: json  });
        console.log(this.state.portfolioData)
     })
   }
   handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // validate the secret key from the array of platform configuration objects
    console.log(platformObj)
    let tokenkey = platformObj.filter((p) => p.home == newMessage)

    if (!msgObj.Token) {
        if (tokenkey.length>0) {
            console.log("Token found")
            console.log(tokenkey)
            addResponseMessage("Thank you!")
            addResponseMessage("How can I help you?")
            msgObj.Token = tokenkey[0].home
        } else {
            console.log("Token Not Found")
            console.log(tokenkey)
            addResponseMessage("Password not valid")
            addResponseMessage('Please try again')
            addResponseMessage('Hint: demo')
          }
        return
      }

    msgObj.Body = newMessage
    fetch(`${apiProfile}/api/sms`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgObj)
      }).then(res => res.json()).then(response => {
          response.forEach((r) => {
              console.log(r)
              let rKey = Object.keys(r)[0]
              if (rKey == "link") {
                  addLinkSnippet({
                    title: 'You can learn more here:',
                    link: r.link
                  })
                } else {
              let message = r[rKey]
              addResponseMessage(message)
              }
          })
        })
          //addResponseMessage(response.message)
          /*
        if (response.link) {
            addLinkSnippet({
              title: 'Click on the link',
              link: response.link
            })
          }
          */

      }


  componentDidMount(){
    this.getPortfolioData();
    addResponseMessage("Let's get started! Please enter your password");
    console.log('home app')
  }



  render() {
    console.log(this.state.portfolioData);
    return (
      <div>
      <div className="App">
        <Header data={this.state.portfolioData.main} />
        <Jumbotron data={this.state.portfolioData.main} />
        <About data={this.state.portfolioData.main} />
        <Market data={this.state.portfolioData.market} />
        <Portfolio data={this.state.portfolioData.portfolio} />
        <Testimonials  data={this.state.portfolioData.testimonials} />
        <Contact data={this.state.portfolioData.main} />
        <Footer />
      </div>
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Strategic Machines"
          subtitle="Connecting Business to the Conversational Economy"
        />
      </div>
    </div>
    );
  }
}

export default App;
