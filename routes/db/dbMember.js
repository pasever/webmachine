'use strict';

//////////////////////////////////////////////////
//////// route for new member registration ///////
//////////////////////////////////////////////////

const mongoose            = require('mongoose');
const { Client }          = require('../../db/schemas/Client');
const { memberSchema }    = require('../../db/schemas/Member');
const utils               = require('../../utils')
const bodyParser          = require('body-parser')
const api                 = require('../../api')
const {
  verifyJWTToken,
  getIdFromToken
}                         = require('../../utils/auth/verifyJwtToken')

const dbMember = (router) => {
  /**
   * @private {Route}
   * @method POST
   * @description
   * Receives member payload and calls on DB method to insert
   * Member document. 
   */

  router.use(bodyParser.json())

  router.post('/register', verifyJWTToken, (req, res, next) => {
    console.log('got a request');
    // Grab payload from body
    let memberPayload = req.body;
    // Build and return Member Object
    let newMemberObj = buildMemberObject(memberPayload, req.headers.authorization)
    
    registerMember(newMemberObj)
      .then(result => {
        // console.log(result);
        res.json({ result })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ 
          msg: 'Something went wrong...',
          error
        })
      })
    
  });

}

module.exports = dbMember

/**
 * @param {Object}    - Receives member payload with information
 *                      necessary to build Member Document.
 * @returns {Object}  - Return a new instance of Member Schema
 * 
 * */
function buildMemberObject(payload, header) {
  let { member_form, networks_to_join } = payload;
  // Extract idToken from auth header
  let idToken = getIdFromToken(header);
  let obj = {};

  obj.firstName = member_form.firstName;
  obj.lastName = member_form.lastName;
  obj.image = member_form.image ? member_form.image : 'null';
  obj.city = member_form.city;
  obj.state = member_form.state;
  obj.zip = member_form.zip;
  obj.cell = member_form.phone;
  obj.email = member_form.email;
  obj.auth0Id = idToken;
  obj.networks = networks_to_join;

  // let newMember = new Member(obj);

  return obj;

}



// Iterate through every Client adding memberId to members[]
async function saveMemberIdIntoClientsMembersList(Member) {
  // Construct query
  let query = { "_id": { "$in": Member.networks } };
  // Set update operation
  let update = { "$push": { members: Member.auth0Id } };
  // Push Member's id into each of the matching Client's members array
  let result = await Client.updateMany(query, update);
  return result;
}

async function fetchURIs(client_ids) {
  // Construct query
  let query = { "_id": { "$in": client_ids } };
  // Set query projection
  let projection = { "dbname": 1, "uri": 1 };
  // Find Clients by _id.
  // Retrieve URI and DBNAME for each match.
  let result = await Client.find(query, projection);
  // Construct DB URI for each Client and store results in an array
  // let uris = result.map(elem => elem.uri + elem.dbname);
  return result;
}


async function registerMemberInEachSelectedNetwork(memberObj, uris) {
  uris.forEach(client => {

    if(utils.isValidUrl(client.uri)) {
      let clientDbUri = client.uri + client.dbname;
      // connect and save
      console.log('going to open connection to... ' + clientDbUri)
      let db = mongoose.createConnection(clientDbUri, { poolSize: 10 });
      db.on('error', function() {
        console.log('Couldn\'t connect to ' + clientDbUri)
      });
      db.on('open', function() {
        let MemberConnection = db.model('Member', memberSchema);

        MemberConnection.create(memberObj, function(err, doc) {
          if(err) {
            console.log('Error saving Member: '+ err)
          }
          return
        });

        console.log('Member inserted: ' + db.name + ' at ' + db.host);

      });
    } else {
      console.log('Caution - Invalid Client URI ' + client.uri + client.dbname);
    }

  });
}

async function registerMember(Member) {
  // step1 - add member's id to clients' members array
  let result1 = await saveMemberIdIntoClientsMembersList(Member);
  if (result1.ok !== 1) return new Error('Error in step1');
  // step2 - fetch the URI for each client's DB
  let uris = await fetchURIs(Member.networks);
  // step3 - save Member document into each client's database (Member Collection)
  let result2 = await registerMemberInEachSelectedNetwork(Member, uris);

  return result2;
}