'use strict';

//////////////////////////////////////////////////////
////////      process web http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const config =          	require('../config').init()

const web = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING WEB MESSAGE -----------")

    res.status(200)
    res.json({message: "web message received"})
    next()
 });
}

module.exports = web
