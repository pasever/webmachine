'use strict';

//////////////////////////////////////////////////////
////////          github processes            ///////
////////////////////////////////////////////////////


const bodyParser =  	 require('body-parser')
const issues =       	 require('express').Router();
const repos =        	 require('express').Router();
const createIssue = 	 require('express').Router();
const editIssue =      require('express').Router();

const { verifyJWTToken } = require('../utils/auth/verifyJwtToken');

// register routes
require('./git/issues')(issues);
require('./git/repos')(repos);
require('./git/create-issue')(createIssue);
require('./git/edit-issue')(editIssue);

const git = (router) => {
  // Authentication middleware
  router.use(verifyJWTToken);
	router.use(bodyParser.json());
	// api/github/issues
	router.use('/issues', issues);
	// api/db/client
	router.use('/repos', repos);
	// api/github/create-issue
  router.use('/create-issue', createIssue);
  // api/github/edit-issue
  router.use('/edit-issue', editIssue);
}

module.exports = git
