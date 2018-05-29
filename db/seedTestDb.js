'use strict';

///////////////////////////////////////////////////////////////////////
////////  initialize test data when running in test env //////////////
//////////////////////////////////////////////////////////////////////

const mongoose =            require('mongoose')
const Client =              require('./schemas/Client').Client
const dbClient =            require('../api/client/db');
const platform =            require('../config').platform()
const utils =               require('../utils')
const testClients =         require('./data/clients')
const initializeAgents =    require('./initialize/getagents')
const initializeMembers =   require('./initialize/getmembers')
const initializeWorkitems = require('./initialize/getworkitems')
const initializeConfigs =   require('./initialize/getconfigs')
const { g, b, gr, r, y } =  require('../console')

let options = {
  poolSize: 10 // Maintain up to 10 socket connections
};


// creating a collection of Agents from agents.js  so Agents Cards can be displayed 
// this is a temporary workaround to an issue with agent test-data insertion
// comment left by Evgheni on May 1 (lines 23 - 31)
const Agent = require('./schemas/Agent').Agent;
const testAgents = require('./data/agents');

Agent.create(testAgents, (err, response) => {
console.log(response);
});



// initializes db and collections for test environment
// platform contains the uri for physical database with test client collection
module.exports = function (envState) {
    mongoose.Promise = global.Promise;
    const config = platform.filter((p) => p.isLive == envState)
  //  const dbURI = config[0].uri + config[0].db

    if (utils.isValidUrl(config[0].uri)) {
    console.log("----- ENTERED SEEDTESTDATA----")
    // execute async function
      steps(config)
        .then((result) => {
          console.log("----- Test Databases Created and Seeded----")
          return
        })
        .catch((err) => {
          console.log("ERROR - Creating Test Databases")
          console.log(err)
          return
        })
      
      }
      else {
        console.log("ERROR - Platform JSON Configuration Error Test DB Not Initialized")
        return
      }
      const dbURI = process.env.DBURI || config[0].uri + config[0].db
      mongoose.connect(dbURI)
    
    // drop and create test client collection. For every valid client, create test collections on their db
    async function steps(config) {
      let clientArray =    await step1(config)
      let result =         await step2(clientArray)
      return result
    }
}

const step1 = (config) => {
  // drop old test collection for clients and create new test collection
  return new Promise((resolve, reject) => {
      const dbURI = process.env.DBURI || config[0].uri + config[0].db
      mongoose.connect(dbURI)
      let dbc = mongoose.connection
      Client.remove({}, function(e, removed){
        if (e) console.log("Error removing test client documents")
        console.log("Test Client Docs Removed " + removed.n)
      })
      Client.create(testClients, (err, response) => {
          console.log(g('Clients Initialized: ' + dbc.name + ' at ' + dbc.host))
        // return array of new customer objects that were returned from db - used in step2
        resolve(response)
      })
      let promises = [];
      testClients.map(current => {
        promises.push(dbClient.putClient(current));
      })
      Promise.all(promises).then(response => console.log("CLIENT'S TEST DATA PROMISE RESOLVED"));
  })
}

const step2 = (clientArray) => {
  // intialize a set of test collections for each valid client in the customer db
  return new Promise((resolve, reject) => {
    if (!clientArray) {
      reject(null)
      return
    }

    clientArray.forEach((a) => {
      if (utils.isValidUrl(a.uri)) {
        let conn = mongoose.createConnection(a.uri + a.dbname, options)
        conn.on('error', console.error.bind(console, r('connection error...')));
        conn.once('open', function callback() {
            initializeWorkitems.getWorkitems(conn);
            initializeAgents.getAgents(conn);
            initializeMembers.getMembers(conn);
            initializeConfigs.getConfigs(conn);
        });
       }
       else {
         console.log(y('Caution - invalid platform config: ' + a.name + ' uri = ' + a.uri))
       }
    })
    resolve("success")
  })
}
