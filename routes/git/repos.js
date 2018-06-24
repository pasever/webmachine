'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////


const api = require('../../api/git/index');

const repos = (router) => {
  // Fetches all repositories of the specified github user.
  router.get('/:username', (req, res, next) => {
    let username = req.params.username;
    api.getReposForUser(username).then(function(repos) {
      console.log(`request received, returning repos for user ${username}...`);
      res.json(repos);
      next()
    }).catch(function(error) {
      console.log(error);
      next(error);
    });
  });
}
module.exports = repos;
