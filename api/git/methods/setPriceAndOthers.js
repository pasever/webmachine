'use strict';

/////////////////////////////////////////////
////////        db interactions      ///////
///////////////////////////////////////////

const moment =            require('moment');
const { Workitem } =      require('../../../db/schemas/Workitem');
const { r } =             require('../../../console');

module.exports = async function(issues, repo) {
  // Get all workitems for repo from db
  let data = await Workitem.find({repo: repo}).lean();
  /*
    Iterate through issues and:
      1. find the workitem with matching issue number
      2. attach some values to issue object
      3. return issue
    In the end we're left with a new array of issues, all with
    prices, etc.
  */
  try {
    issues = issues.map(issue => {
      let issue_number = issue.number.toString();
      let workitem = data.find(wi => wi.itemId === issue_number);
      issue.price = workitem.price;
      issue.stage = workitem.stage;
      issue.assignee = workitem.assignee;
      issue.due_date = moment(workitem.dueDate).format("MMMM Do, YYYY");
      return issue;
    });
  } catch (error) {
    // At this point in development, considering the way in which
    // infrastructure is set in place, we should never run into a
    // situation where a workitem is created from the marketplace
    // AND it doesn't get added both to the DB and GitHub; these
    // two things happen back to back in order to ensure data consistency.

    // There are only two possible cases by which we may reach this catch block;
    // 1. An issue is created on GitHub and no matching workitem document is
    //    inserted into the DB - this would case a TypeError where the program
    //    "cannot read X property of undefined".
    // 2. There are no issues/workitems in a repository yet. This would also cause
    //    a TypeError where the program "cannot read X property of undefined".

    // How then, considering both scenarios produce the same error type, are we to
    // determine which one of the above cases happened when we catch an error?
    // This is something to think about. At least for now, we have prevented the program
    // from crashing whenever an error is caught.
    console.log(r('!--- An error has been caught inside setPriceAndOthers.js ---!'));
    console.log(r('One of two possible things have happened; please refer to the comments in the file for more details.'));
    console.log(r('For now, however, we have prevented the program from crashing.'));
    console.log(r('Be advised that we are working on a more effective and graceful way of handling this error.'))
  }
  
  return issues;
}
