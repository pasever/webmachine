/**
 * @name mongoose.js
 * @description 
 * Establishes a connection to the database via mongoose.
 * Checks if there is a DBURI in the environment variables first.  
 * Then checks if the config.uri (in platform) has a valid uri.
 */


const mongoose =            require('mongoose');
const platform =            require('../config').platform()
const utils =               require('../utils');

const { g, r } =               require('../console');

module.exports = (envState) => {
    // Set mongoose up for promises rather than callbacks
    mongoose.Promise = global.Promise;

    // Gets the live platform uri's in platform.json
    const config = platform.filter(p => p.isLive === envState)[0];

    // Sets the dbURI
    const dbURI = process.env.DBURI || utils.isValidUrl(config.uri) ? config.uri + config.db : ""
    // Nothing to connect to?
    if(dbURI === "") {
        console.log(r("There is no data connection to be made!  Please see Platform Config."));
        throw new Error("There is no database to connect to");
    }

    // Opens connection
    mongoose.connect(dbURI);
    console.log(g("We have established a connection to the database."))
    
}
