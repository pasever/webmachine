const {
  verifyJWTToken,
  getIdFromToken
}                         = require('../../utils/auth/verifyJwtToken');
const { getProfile }      = require('../../api/member')

/**
 * @description
 * Opens a connection to the specified Client's DB and
 * returns the document ("profile") of the specified Member
 */

const dbGetMemberProfile = (router) => {

  router.use(verifyJWTToken);

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
}

module.exports = dbGetMemberProfile
