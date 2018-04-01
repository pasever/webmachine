'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////

const api = require('../../api/git/index');
const moment = require('moment');
const Workitem  = require('../../db/schemas/Workitem').Workitem;
const { y, r } = require('../../console');

const createIssue = (router) => {
  router.post('/:repo', (req, res, next) => {
    // Build workitem object
    // DOING VALIDATION WOULD BE USEFUL
    // PRICE AND DURATION CANNOT BE LESS THAN 0
    // IS DESCRIPTION RLY NECESSARY FOR DB?
    let workitem = {
      itemId: req.body.issueNumber,
      title: req.body.title,
      repo: req.body.repo,
      price: parseFloat(req.body.price),
      duration: req.body.duration,
      dueDate: moment().add(req.body.duration, 'days').format(),
      description: req.body.description
    };

    console.log(workitem);
    res.json({
      msg: 'Received',
      work_item: workitem
    })
    next();
    // Save wi into DB
    // Workitem.create(workitem)
    // .then(doc => {

    //   let msg = {
    //     db: 'Work item successfully created'
    //   };
    //   console.log(y(msg.db), doc);
    //   // Now create issue on GitHub
    //   api.createIssue(doc.repo, doc.title, doc.description)
    //   .then(response => {
    //     msg.github = 'Issue successfully created';
    //     console.log(y(msg.github), response);
    //     res.json({
    //       msg: msg
    //     });
    //     next()
    //   })
    //   .catch(err => {
    //     msg.github = 'Error creating issue on GitHub';
    //     console.log(r(msg.github) + '\n' + err);
    //     res.json({
    //       msg: msg
    //     });
    //     next();
    //   });
     
    // })
    // .catch(err => {
    //   if (err) {
    //     let msg = 'Error creating workitem. Didn\'t attempt to create on GitHub';
    //     console.log(r(msg) + '\n' + err);
    //     res.json({
    //       error: msg
    //     });
    //     next();
    //   }
    // })

  });
}

module.exports = createIssue;
