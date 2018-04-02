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
    let repo = req.params.repo;
    let wi = req.body;
    console.log(wi);
    // Find work item by # and repo
    Workitem.findOneAndUpdate({
      $and: [
        { itemId: wi.number },
        { repo: wi.repo }
      ]
    }, {
      // Update some properties in Workitems collection
      $set: {
        title: wi.title,
        price: wi.price,
        stage: wi.stage,
        assignee: wi.assignee === '' ? null : wi.assignee,
        description: wi.description
      }
    })
      .then(doc => {
        let msg = `Updated workitem#${doc.itemId} of repo ${doc.repo}`;
        console.log(msg + '\n' + doc);
        res.json({
          msg,
          work_item: doc
        });
        next();
      })
      .catch(err => {
        let msg = `Error updating workitem#${doc.itemId} of repo ${doc.repo}`;
        console.log(msg + '\n' + err);
        res.json({ msg })
        next();
      });
    
  });
}

module.exports = editIssue;
