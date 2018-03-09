'use strict';

//////////////////////////////////////////////////////
////////            github interactions       ///////
////////////////////////////////////////////////////


const api = require('../../api/git/index');

const issues = (router) => {
  // Fetches issues of specified repository
  router.get('/:username/:repo', (req, res, next) => {
    console.log("ENTERED ISSUES")
    console.log(JSON.stringify(req.params))
    let username = req.params.username,
        repo = req.params.repo;
    api.getIssuesForRepo(username, repo).then(function(issues) {
      console.log(`request received, returning issues for repo ${repo}...`);
      res.json(issues);
      next();
    }).catch(function(error) {
      console.log(error);
      next(error);
    });
  });
}
module.exports = issues;
