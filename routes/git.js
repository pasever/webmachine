'use strict';

//////////////////////////////////////////////////////
////////          github processes            ///////
////////////////////////////////////////////////////


const bodyParser =  	 require('body-parser')
const issues =       	 require('express').Router();
const repos =        	 require('express').Router();

// register routes
require('./git/issues')(issues);
require('./git/repos')(repos);

const git = (router) => {
	router.use(bodyParser.json());
	// api/github/issues
	router.use('/issues', issues)
	// api/db/client
	router.use('/repos', repos)
}

module.exports = git
