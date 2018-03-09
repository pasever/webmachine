'use strict';

//////////////////////////////////////////////////////
////////      process sms message             ///////
////////////////////////////////////////////////////

const bodyParser =  			  require('body-parser')
const request = 					  require('request')
const clone =               require('clone-deep')
const { initialize,
        response,
        record } =          require('../stages')
const { g, b, gr, r, y } =  require('../console');

const sms = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log(g("-------------Incoming Message -----------"))

  let workreq = {}
  workreq.message = Object.assign({}, req.body)

  stages(workreq, req, res).then((workObj) => {
    return
    }).catch((err) => {
    console.log("SMS ROUTE - ERROR IN THREAD PROCESSING")
    console.log(err)
  })

  // Temporary mock up of stages to handle web interactions until
  // system is linked to interaction platform

  async function stages(obj, req, res) {
    let stage000 =    await initialize(obj, req)
    // pass in the res object to close off http session
    let stage900 =    await response(stage000, req, res)
    let stage950 =    await record(stage900, req)

    return stage950
  }

 });
}

module.exports = sms
