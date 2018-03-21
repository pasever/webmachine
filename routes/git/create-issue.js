'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////

// method for posting workitems to DB
// and creating an issue on GitHub not created yet
const api = require('../../api/git/index');
const Workitem  = require('../../db/schemas/Workitem').Workitem;

const createIssue = (router) => {
  router.post('/:repo', (req, res, next) => {
    // insert workitem into into DB
    // post to github
    let workitem = req.body;
    console.log('got it!', workitem);
    res.json({
      msg: 'workitem received successfully!',
      repo: req.params.repo,
      workitem
    });
    next()
  });
}

module.exports = createIssue;
