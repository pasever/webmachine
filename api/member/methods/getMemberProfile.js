const mongoose            = require('mongoose');
const { Client }          = require('../../../db/schemas/Client');
const { memberSchema }    = require('../../../db/schemas/Member');
const utils               = require('../../../utils');

/** @todo enforce rigorous and user friendly ERROR handling */

module.exports = async function getMemberProfile (clientId, memberId) {
  // Get Client's DB URI
  let clientURI = await getClientURI(clientId);

  // Fetch Member's Profile
  let memberProfile = await fetchMemberProfile(clientURI, memberId);

  // Check to make sure you're not returning null
  // if (memberProfile.type === 'ERROR') throw memberProfile

  return memberProfile; 
}

async function getClientURI(clientId) {
  // Construct query
  let query = { "_id": clientId };
  // Set query projection
  let projection = { "dbname": 1, "uri": 1 };
  // Get client's uri
  let result = await Client.findById(query, projection);
  
  return result;
}

async function fetchMemberProfile (client, memberId) {
  // Check for valid URI
  if (utils.isValidUrl(client.uri)) {

    // Construct Client's DB URI
    let clientDbUri = client.connectionString; //client.uri + client.dbname;

    // Open connection to Client's DB
    let db = mongoose.createConnection(clientDbUri, { poolSize: 10 });
    
    // If there's an error, log message.
    db.on('error', function() {
      console.log('Error connecting to Client\'s Database');
    });

    // If connection is successful, log message
    db.on('open', function() {
      console.log('Connected to MemberCollection, retrieving profile');
    })

    // Create reference to MemberCollection
    let MemberCollection = db.model('Member', memberSchema);

    // Construct query
    let query = { "auth0Id": memberId };
    let projection = { firstName: 1, lastName: 1, cell: 1, email: 1 }

    // Fetch member profile
    let profile = await MemberCollection.findOne(query, projection);

    return profile;

  } else {
    // If URI invalid, return throw error

    console.log('Caution - Invalid Client URI ' + client.connectionString); //client.uri + client.dbname);

    // return {
    //   type: 'ERROR',
    //   happened_while: 'Attempting to validate Client\'s DB URI',
    //   in_file: './routes/db/dbGetMemberProfile.js',
    //   description: 'Invalid DB URI'
    //  }
  }

}