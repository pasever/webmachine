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

const req = {
  owner: 'strategicmarket',
  repo: 'workitem-lab',
  title: '',
  body: ''
};

async function createIssue(req) {
  let result = await github.issues.create(req)
  .catch(err => { throw err });
  let resObj = {
    status: result.meta.status,
    url: result.data.html_url
  };
  return resObj;
}

createIssue(req).then(res => console.log(res));

module.exports = createIssue;
