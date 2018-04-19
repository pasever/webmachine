
'use strict';

///////////////////////////////////////////////////////////////////////
///////////////////      partner test db          ////////////////////
//////////////////////////////////////////////////////////////////////

// REFACTOR - USING MONGOOSE POPULATE

const uuidv1 = require('uuid/v1');

const objStore =  [
  {
  	facebook: {
  		clientID: "",
  		clientSecret: "",
  		callbackURL: "",
  		profileFields: ["id", "displayName", "photos"]
  	},
  	twitter: {
  		consumerKey: "",
  		consumerSecret: "",
  		token: "",
  		tokenSecret: "",
  		callbackURL: "",
  		username: "@chaoticbots",
  		profileFields: ["id", "displayName", "photos"]
  	},
  	twilio: {
  		sid: "",
  		token: "",
  	  tokenSecret: "",
  	  username: "",
  		chaotic: ""
  	},
    email: {

    },
    vmail: {

    },
    slack: {

    },
  	redis: {
  		host: "",
  		port: 15416,
  		password: ""
  	},
  	watsonclassifier: {
  		description: "Turing machine classifier V2",
  		url: "https://gateway.watsonplatform.net/natural-language-classifier/api",
  		username: "",
  		password: "",
  		classifier1: ""
  	},
    runparms: {
    	confidenceLevel: 60,
    	expirationInterval: 1200,
    	agentCallbackThreshold: 8,
    	machineIterationThrehold: 20
    }
  }

]

module.exports = objStore;
