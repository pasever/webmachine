
////////////////////////////////////////////////////////////////
////////             strategicmachines.io              ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////
const request =            require('request')
const express =            require('express');
const helmet =             require('helmet');
const expressValidator =   require('express-validator');
const path =               require('path');
const bodyParser =         require('body-parser');
const cors =               require('cors')
const favicon =            require('serve-favicon');
const logger =             require("morgan");
const api =                require("../api")
const keys =               require('../config').init();
const transport =          require('../config/gmail')
const { g, b, gr, r, y } = require('../console');

const app =   express();;

//////////////////////////////////////////////////////////////////////////
/////////////    Seed test data if test env detected          ///////////
////////////////////////////////////////////////////////////////////////

let envState = true
if ( process.env.isLive == 'false' ) {
    envState = false
    require('../db/mongoose')(envState)
}


//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator());
app.use(express.static('public'));
app.use('/dist', express.static('public'));
app.use('/form', express.static('public'));
app.use('/machine', express.static('public'));
app.use('/market', express.static('public'));
app.use('/dashboard', express.static('public'));
app.use('/landing', express.static('public'));
app.use('/client', express.static('public'));
app.use('/member', express.static('public'));
app.use('/', express.static('public/home'));
app.use(favicon(path.join(__dirname, '..', '/public/assets/favicon.ico')));
app.use(cors())


///////////////////////////////////////////////////////////////////////
/////////////////// Server requet for chat widget ////////////////////
//////////////////////////////////////////////////////////////////////

let  chatApi = 'https://strategicmessage.mybluemix.net'

app.use(bodyParser.json({
	type: 'application/json',
  extended: true
  }));
  
  app.post('/api/sms', openHandler);
//  function issues http call to server, testing the microservices and returning response
async function openHandler(req, res) {
  console.log("Call open handler called")
	const {method, url, headers, body } = req
	const result = await callOpenWhisk(url)
	console.log("openhandler function ")
	res.status(200).send(JSON.stringify(result))
  return	
  console.log(req);
}

const callOpenWhisk = (route) => {
  console.log("Call open whisk called")
	return new Promise((resolve, reject) => {
	   request.post( chatApi + route, { json: data }, function (error, response, body) {
	       if (error) {
	          console.log("Error encountered calling - callOpenWhisk")
	          console.log(error)
            reject(error) }
            console.log(data)
	       resolve(body)
	    });
	  })
}
///////////////////////////////////////////////////////////////////////
/////////////////// messaging alert for platform errors ///////////////
//////////////////////////////////////////////////////////////////////

const mailObject = {
  from: '"ChaoticBots 👥" <chaoticbotshelp@gmail.com>',
  to: 'patrick.howard@hotmail.com',
  subject: 'Platform Error',
  text: ''
}
process.on('uncaughtException', function (er) {
    console.error(er.stack)
    mailObject.text = er.stack;
    transport.sendMail(mailObject, function (er) {
       if (er) console.error(er)
       process.exit(1)
    })
  })

//////////////////////////////////////////////////////
////////// Register and Config Routes ///////////////
////////////////////////////////////////////////////

const sms =       express.Router();
const db =        express.Router();
const git =       express.Router();
const auth =      express.Router();
const errs =      express.Router();
const unk =       express.Router();
const help =      express.Router();
const home =      express.Router();
require('../routes/auth')(auth);
require('../routes/db')(db);
require('../routes/git')(git);
require('../routes/sms')(sms);
//require('../routes/web')(web);
require('../routes/error')(errs);
require('../routes/help')(help);
require('../routes/home')(home);
require('../routes/unk')(unk);
//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// auth test
app.use(auth)
// home route
//app.use('/', home);
// text > twilio > server process
app.use('/api/sms', sms)
// web > twilio > text
//app.use('/api/web', web)
// db api
app.use('/api/db', db)
// github api
app.use('/api/github', git)
// 404
app.use(unk)
// error handling
app.use(errs)

// server

let port = process.env.PORT || keys.port;
app.listen(port, () => {
  console.log(b('listening on port '), port)
});


