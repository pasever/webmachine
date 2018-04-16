'use strict';

//////////////////////////////////////////////////////
////////            github interactions       ///////
////////////////////////////////////////////////////

const github =             require('@octokit/rest')();
const { githubrepo } =     require('../../../config').init();

github.authenticate({
  type: 'oauth',
  token: githubrepo.token
});

async function editIssue(repo, number, title, body, state = 'open') {
  var result = await github.issues.edit({
    owner: 'strategicmarket',
    repo: repo,
    number: number,
    title: title,
    body: body,
    state: state
  }).catch(err => { throw err });
  return result;
};

module.exports = editIssue;
