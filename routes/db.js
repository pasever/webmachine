'use strict';

//////////////////////////////////////////////////////
////////            db processes              ///////
////////////////////////////////////////////////////


const bodyParser =  	 require('body-parser')
const dbclient =       require('express').Router();
const dbMember = 			 require('express').Router();
const dbagent =        require('express').Router();

// register routes
require('./db/dbagent')(dbagent);
require('./db/dbclient')(dbclient);
require('./db/member')(dbMember);

const db = (router) => {
	router.use(bodyParser.json());

	// api/db/agent
	router.use('/agent', dbagent)

	// api/db/client
	router.use('/client', dbclient)

	// api/db/member
  router.use('/member', dbMember)

}

module.exports = db
