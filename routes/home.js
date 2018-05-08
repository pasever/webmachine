'use strict';

//////////////////////////////////////////////////////
////////      process home http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const config =          	require('../config').init()

const home = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING home MESSAGE -----------")
    console.log(req);
    res.status(200)
    res.json({message: "home message received"})
    next()
 });
}

module.exports = home
