const mongoose =            require('mongoose');
const platform =            require('../config').platform()
const utils =               require('../utils');

const { g, r } =               require('../console');
module.exports = (envState) => {
    mongoose.Promise = global.Promise;
    const config = platform.filter(p => p.isLive === envState)[0];

    const dbURI = process.env.DBURI || utils.isValidUrl(config.uri) ? config.uri + config.db : ""
    if(dbURI === "") {
        console.log(r("There is no data connection to be made!  Please see Platform Config."));
        throw new Error("There is no database to connect to");
    }

    mongoose.connect(dbURI);
    console.log(g("We have established a connection to the database."))
    
}
