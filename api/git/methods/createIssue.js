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

async function createIssue(repo, title, body) {
  let result = await github.issues.create({
    owner: 'strategicmarket',
    repo: repo,
    title: title,
    body: body
  })
  .catch(err => { throw err });
  let resObj = {
    status: result.meta.status,
    url: result.data.html_url
  };
  return resObj;
}

module.exports = createIssue;
