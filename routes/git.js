'use strict';

//////////////////////////////////////////////////////
////////          github processes            ///////
////////////////////////////////////////////////////


const bodyParser =  	 require('body-parser')
const issues =       	 require('express').Router();
const repos =        	 require('express').Router();
const createIssue = 	 require('express').Router();

// register routes
require('./git/issues')(issues);
require('./git/repos')(repos);
require('./git/create-issue')(createIssue);

const git = (router) => {
	router.use(bodyParser.json());
	// api/github/issues
	router.use('/issues', issues);
	// api/db/client
	router.use('/repos', repos);
	// api/github/create-issue
	router.use('/create-issue', createIssue);
}

module.exports = git
