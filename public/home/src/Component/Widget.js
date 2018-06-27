import React, { Component }   from 'react';
import { Widget,
    addResponseMessage,
    addLinkSnippet,
    addUserMessage }     from 'react-chat-widget';
import uuidv1        from 'uuid/v1';
import config                 from '../../../../config'
import logo                   from '../../../avatar/persona/mark.png';

// chatwidget elements
let apiProfile = "https://strategicmessage.mybluemix.net"
let user = "+17048984551"
let platform = "+19148195104"

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
  ChaoticSource: "web",
  Token: undefined
}

class ChatWidget extends Component {
        constructor(props){
          super(props);
        }
    

        

// function for handling the password submitted by the user
          handleNewUserMessage = (newMessage) => {
           console.log(`New message incoming! ${newMessage}`);
           // validate the secret key from the array of platform configuration objects
           console.log(platformObj)
           let tokenkey = platformObj.filter((p) => p.webpassword == newMessage)
       
           if (!msgObj.Token) {
               if (tokenkey.length>0) {
                   console.log("Token found")
                   console.log(tokenkey)
                   addResponseMessage("Thank you!")
                   addResponseMessage("How can I help you?")
                   msgObj.Token = tokenkey[0].webpassword
               } else {
                   console.log("Token Not Found")
                   console.log(tokenkey)
                   addResponseMessage("Password not valid")
                   addResponseMessage('Please try again')
                   addResponseMessage('Hint: demo')
                 }
                 console.log(msgObj.Token)
               return
             }
       //when the user submits a message after logged in, this runs to post the message to 
       //the api server and recieve a response to post in the chat widget as a reply
       //based on the array.
           msgObj.Body = newMessage
           console.log(JSON.stringify(msgObj))
           fetch(`${apiProfile}/api/sms`, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(msgObj)
          }).then(res => res.json()).then(response => {      
             console.log(response)
             
            response.forEach((r) => {
              console.log(r)
              let rKey = Object.keys(r)[0]
              let message = r[rKey]
              addResponseMessage(message)
         
           })
         })
        }
          
       // request user for password upon chat widget mount
         componentDidMount(){
           addResponseMessage("Let's get started! Please enter your password");
         }


      render() {
        return (
            <Widget
              handleNewUserMessage={this.handleNewUserMessage}
              profileAvatar={logo}
              title="Strategic Machines"
              subtitle="Connecting Business to the Conversational Economy"
            />
    );
  }
}
        
export default ChatWidget;