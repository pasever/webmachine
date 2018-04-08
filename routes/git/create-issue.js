'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////

const api = require('../../api/git/index');
const expressValidator =   require('express-validator');
const moment = require('moment');
const Workitem  = require('../../db/schemas/Workitem').Workitem;
const { y, r } = require('../../console');

const createIssue = (router) => {
  router.post('/:repo', (req, res, next) => {

    // Basic back end validation
    req.checkBody('issueNumber',  'Workitem number is required').notEmpty();
    req.checkBody('title',        'Cannot create a workitem without a title').notEmpty();
    req.checkBody('repo',         'Repo name is required').notEmpty();
    req.checkBody('price',        'Workitem must have a price').notEmpty();
    req.checkBody('price',        'Workitem price must be a number').isFloat(true);
    req.checkBody('price',        'Workitem price must be greater than 0').isFloat({ gt: 0.0 });
    req.checkBody('duration',     'Workitem duration is required.').notEmpty();
    req.checkBody('duration',     'Workitem duration must be a number').isInt(true);
    req.checkBody('duration',     'Workitem duration must be greater than 0').isInt({ gt: 0 });
    req.checkBody('description',  'Please provide a brief description for the workitem').notEmpty();
    // Run validators and catch potential errors
    const errors = req.validationErrors();
    // If there are errors, notify client side and end request.
    // In other words, if errors, workitem doesn't get created.
    if (errors) {
      console.log(r('! Validation Error !') + '\n' + JSON.stringify(errors, null, 2));
      res.json({
        errorType: "VALIDATION",
        errors 
      });
      next();
    } else {
      // If validation passes, build workitem object
      let workitem = {
        itemId: req.body.issueNumber,
        title: req.body.title,
        repo: req.body.repo,
        price: parseFloat(req.body.price),
        duration: req.body.duration,
        // dueDate should get assigned the moment the workitem gets assigned to a dev
        // dueDate: moment().add(req.body.duration, 'days').format(),
        description: req.body.description
      };
      console.log(req.body);
      console.log(y('no errors!'));
      res.json({
        msg: 'workitem captured, verifying...'
      });
      next();
    }
  
    /*
    // Save wi into DB
    Workitem.create(workitem)
    .then(doc => {

      let msg = {
        db: 'Work item successfully created'
      };
      console.log(y(msg.db), doc);
      // Now create issue on GitHub
      api.createIssue(doc.repo, doc.title, doc.description)
      .then(response => {
        msg.github = 'Issue successfully created';
        console.log(y(msg.github), response);
        res.json({
          msg: msg
        });
        next()
      })
      .catch(err => {
        msg.github = 'Error creating issue on GitHub';
        console.log(r(msg.github) + '\n' + err);
        res.json({
          msg: msg
        });
        next();
      });
     
    })
    .catch(err => {
      if (err) {
        let msg = 'Error creating workitem. Didn\'t attempt to create on GitHub';
        console.log(r(msg) + '\n' + err);
        res.json({
          error: msg
        });
        next();
      }
    })
    */

  });
}

module.exports = createIssue;

// TESTING BLOCK
// {
//    console.log(workitem);
//     res.json({
//       msg: 'Received',
//       work_item: workitem
//     })
//     next();
// }
