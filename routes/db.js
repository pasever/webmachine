'use strict';

//////////////////////////////////////////////////////
////////            db processes              ///////
////////////////////////////////////////////////////


const bodyParser =  	 require('body-parser')
const dbclient =       require('express').Router();
const dbMember = 			 require('express').Router();
const dbagent =        require('express').Router();
const dbGetMemberProfile = require('express').Router();

// register routes
require('./db/dbagent')(dbagent);
require('./db/dbclient')(dbclient);
require('./db/dbMember')(dbMember);
require('./db/dbGetMemberProfile')(dbGetMemberProfile);

const db = (router) => {
	router.use(bodyParser.json());

	// api/db/agent
	router.use('/agent', dbagent)

	// api/db/client
	router.use('/client', dbclient)

	// api/db/member
  router.use('/member', dbMember)
  
  // api/db/member/profile/network/:clientId
  router.use('/member/profile/network', dbGetMemberProfile);

}

module.exports = db
