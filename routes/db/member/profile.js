const mongoose            = require('mongoose');
const { Client }          = require('../../../db/schemas/Client');
const { memberSchema }    = require('../../../db/schemas/Member');
const {
  verifyJWTToken,
  getIdFromToken
}                         = require('../../../utils/auth/verifyJwtToken');
const { getProfile }      = require('../../../api/member');

/**
 * @private {Route}
 * @method GET
 * @description
 * Opens a connection to the specified Client's DB and
 * returns the document ("profile") of the specified Member
 */

const memberProfile = (router) => {

  /** @method GET */
  router.get('/:clientId', (req, res, next) => {
    let { clientId } = req.params;
    let memberId = getIdFromToken(req.headers.authorization);

    getProfile(clientId, memberId)
      .then(profile => {
        res.status(200).json({
          msg: 'Found profile',
          profile
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'There was an error fetching the requested data',
          err
        })
      })
  })

  /** @method DELETE */
  router.delete('/:clientId', async (req, res, next) => {
    console.log('ENTERED DELETE ROUTE')
    const { clientId } = req.params;
    const memberId = getIdFromToken(req.headers.authorization);

    // Fetch Client's URI
    const query1 = { "_id": clientId };
    const projection = { "dbname": 1, "uri": 1 };
    const dbKeys = await Client.findById(query1, projection);

    // Remove Member from Client's members[Array]
    const query2 = { "_id": clientId };
    const update = { "$pull": { "members": memberId } };  
    try {
      await Client.findByIdAndUpdate(query2, update);
    } catch (error) {
      let message = 'ERROR - Trouble removing Member from Client\'s roster';
      res.status(500).json({ error, message })
    }
  
    // Establish connection and reference to Member Collection
    const dbURI = dbKeys.uri + dbKeys.dbname;
    console.log(dbURI)
    const db = mongoose.createConnection(dbURI, { poolSize: 10 });
    const Members = db.model('Member', memberSchema);

    // Remove Member Document from Client's Member Collection
    const query3 = { "auth0Id": memberId }
    try {
      await Members.remove(query3)
    } catch (error) {
      let message = 'ERROR - Trouble removing Member from Client\'s Database';
      res.status(500).json({ error, message })
    }

    res.status(200).json({
      message: 'Successfully removed Member from Network'
    });

  });


}


module.exports = memberProfile
