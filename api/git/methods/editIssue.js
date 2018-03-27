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

async function editIssue() {
  var result = await github.issues.edit({
    owner: 'strategicmarket',
    repo: 'workitem-lab',
    number: 3,
    title: 'closing test',
    body: 'running tests from my machine',
    state: 'open'
  }).catch(err => { throw err });
  return result;
}

// editIssue()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   })
