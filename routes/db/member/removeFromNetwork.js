const { getIdFromToken }  = require('../../../api/auth/verifyJwtToken');

const mongoose            = require('mongoose');
const { Client }          = require('../../../db/schemas/Client');
const { memberSchema }    = require('../../../db/schemas/Member');

const removeFromNetwork = (router) => {

  router.delete('/:clientId', async (req, res) => {
    const memberId = getIdFromToken(req.headers.authorization);
    const { clientId } = req.params;

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
    const dbURI = dbKeys.uri + dbKeys.name;
    const db = mongoose.createConnection(dbURI, { poolSize: 10 });
    const Members = db.model('Member', memberSchema);

    // Remove Member Document from Client's Member Collection
    const query3 = { "auth0Id": memberId }
    try {
      await Members.findByIdAndRemove(query3)
    } catch (error) {
      let message = 'ERROR - Trouble removing Member from Client\'s Database';
      res.status(500).json({ error, message })
    }

    res.status(200).json({
      message: 'Successfully removed Member from Network'
    })

  });

}

