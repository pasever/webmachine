'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////

const api = require('../../api/git/index');
const moment = require('moment');
const Workitem  = require('../../db/schemas/Workitem').Workitem;
const { y, r } = require('../../console');

const editIssue = (router) => {
  router.put('/:repo', (req, res, next) => {
    let param = req.params.repo;
    let wi = req.body;
    console.log(wi);
    res.json({
      msg: 'Received work item edit',
      wi: wi
    });
    next();
  });
}

module.exports = editIssue;
