'use strict';

const Workitem  = require('../../db/schemas/Workitem').Workitem;

const createIssue = (router) => {
  router.post('/:repo', (req, res, next) => {
    // insert workitem into into DB
    // post to github
    console.log('you\'ve reached create-issue route');
    console.log(req.params.repo);
    res.json({
      msg: 'you\'ve hit create-issue route',
      repo: req.params.repo
    });
    next()
  });
}

module.exports = createIssue