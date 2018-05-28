'use strict';

//////////////////////////////////////////////////
//////// route for new member registration ///////
//////////////////////////////////////////////////

// const mongoose            = require('mongoose');
// const { Client }          = require('../../db/schemas/Client');
// const { memberSchema }    = require('../../db/schemas/Member');
const utils               = require('../../utils');
const bodyParser          = require('body-parser');
const {
  verifyJWTToken,
  getIdFromToken
}                         = require('../../utils/auth/verifyJwtToken')
const { register }        = require('../../api/member');

const dbMember = (router) => {
  /**
   * @private {Route}
   * @method POST
   * @description
   * Registers a new Member into the network(s) they selected.
   * Receives member payload and:
   * 1. Builds Member Document by extracting data from payload.
   * 2. Inserts Member's auth0Id into the members[Array] of each Client
   *    in the networks_to_join[Array] (comes in payload).
   * 3. Fetches the DB URI of each Client in the networks_to_join[Array].
   * 4. Opens connection to each of those Client's DB and SAVES a new Member
   *    Document into each Client's Member Collection.
   */

  router.use(bodyParser.json());
  router.use(verifyJWTToken);

  router.post('/register', (req, res, next) => {
    console.log('got a request');
    // Grab payload from body
    let memberPayload = req.body;
    // Build and return Member Object
    let newMemberObj = buildMemberObject(memberPayload, req.headers.authorization)
    // Register Member
    register(newMemberObj)
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
 * @method buildMemberObject
 * @param {Object} payload 
 * @param {Object} header
 * @returns {Object} Member Object
 * 
 * @description
 * Receives member payload and authorization header.
 * Extracts auth0Id from header and uses data from
 * payload to build and return a Member Object.
 * 
 * */
function buildMemberObject(payload, header) {
  // Pull data sets from payload - { Object } & { Array }
  let { member_form, networks_to_join } = payload;
  // Extract idToken from auth header
  let idToken = getIdFromToken(header);
  let obj = {};

  // Build and return Member Object
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

  return obj;
}
