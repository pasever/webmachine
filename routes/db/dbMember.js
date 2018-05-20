'use strict';

//////////////////////////////////////////////////
//////// route for new member registration ///////
//////////////////////////////////////////////////

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
    let memberPayload = req.body;
    let idToken = getIdFromToken(req.headers.authorization);
    console.log(idToken);
    console.log(buildMemberDocument(memberPayload));
    res.json(req.body)
  });

}

module.exports = dbMember

/**
 * @param {Object}    - Receives member payload with information
 *                      necessary to build Member Document.
 * @returns {Object}  - Return a new instance of Member Schema
 * 
 * */
function buildMemberDocument(memberPayload) {

  return 'Got the payload of type ' + typeof memberPayload

}

function checkForIdToken(headers) {

  function extractIdToken(headers) {}

}

async function fetchNetworksToJoinInfo() {}

async function registerMemberToEachNetwork() {}