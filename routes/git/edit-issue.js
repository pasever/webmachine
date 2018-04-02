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
    // Capture values sent from client-side
    let wi = req.body;
    // Find workitem by id and repo
    Workitem.findOneAndUpdate({
      $and: [
        { itemId: wi.number },
        { repo: wi.repo }
      ]
    }, {
      // Update some properties in Workitem document
      $set: {
        title: wi.title,
        price: wi.price,
        stage: wi.stage,
        assignee: wi.assignee === '' ? null : wi.assignee,
        description: wi.description
      }
    })
      .then(doc => {
        // If update successful, log message
        let msg = {
          db: `Updated workitem# ${doc.itemId} of repo ${doc.repo} in database.`
        };
        console.log(y(msg.db));

        // Now post update to GitHub.
        // GitHub only knows two states, open and closed. If a
        // workitem's status is active, it's open on GitHub
        let stage = wi.stage === 'active' ? 'open' : wi.stage;
        api.editIssue(wi.repo, +wi.number, wi.title, wi.description, stage)
          .then(response => {
            msg.github = 'Updated issue on GitHub';
            console.log(y(msg.github));
            res.json({ msg });
            next();
          })
          .catch(err => {
            msg.github = 'Error updating issue on GitHub';
            console.log(r(msg.github) + '\n' + err);
            res.json({ msg });
            next();
          });
       
      })
      .catch(err => {
        let msg = `Error updating workitem in database`;
        console.log(r(msg) + '\n' + err);
        res.json({ msg })
        next();
      });
    
  });
}

module.exports = editIssue;
