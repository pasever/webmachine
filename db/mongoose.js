'use strict';

///////////////////////////////////////////////////////////////////////
////////   connect to our document store and initialize //////////////
//////////////////////////////////////////////////////////////////////

const mongoose =            require('mongoose')
const utils =               require('../utils')
const messageObj =          require('./schemas/message')
const initializeClients =   require('./initialize/getclients')
const initializeAgents =    require('./initialize/getagents')
const initializePartners =  require('./initialize/getpartners')
const initializeWorkitems = require('./initialize/getworkitems')
const { g, b, gr, r, y } =  require('../console')

let options = {
  poolSize: 10 // Maintain up to 10 socket connections
};

// initializes db and collections for test environment
module.exports = function (platformarray) {
    mongoose.Promise = global.Promise;

    let platforms = platformarray.filter((p) => p.isPlatform == true )
    if (platforms.length == 0) {
      console.log(r("Error - no platform config found"))
      process.exit(1)
    }
    let production = true
    if (process.env.isLive == 'false') {
      production = false
    }
    let platform = platforms.filter((p) => p.isLive == production)
    if (platform.length != 1) {
      console.log(r("Error - multiple platform configs found for target env"))
      process.exit(1)
    }
    // should be only 1 config obj
    /// MONGOOSE DOES NOT ALLOW A DOCUMENT TO HAVE A db FIELD.
    let dburi = platform[0].uri + platform[0].dbname

    if (utils.isValidUrl(dburi)) {
        mongoose.connect(dburi, options)
        const db = mongoose.connection
        db.on('error', console.error.bind(console, r('connection error...')));
        db.once('open', function callback() {
          initializeClients.getClients();
          initializePartners.getPartners();
          initializeWorkitems.getWorkitems();
          initializeAgents.getAgents();
      });
      }
      else{
        console.log(r('Error - invalid platform config: ' + a.name + ' uri = ' + a.uri))
        process.exit(1)
      }

};
