'use strict'

/////////////////////////////////////////////////////
/////    Entry point for GitHub API methods    /////
///////////////////////////////////////////////////

module.exports = {
    getReposForUser: require('./methods/getReposForUser'),
    getIssuesForRepo: require('./methods/getIssuesForRepo'),
    createIssue: require('./methods/createIssue'),
    editIssue: require('./methods/editIssue')
}
