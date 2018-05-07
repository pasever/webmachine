
////////////////////////////////////////////////////////////////
////////             strategicmachines.io              ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////

const express =            require('express');
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
    require('../db/seedTestDb')(envState)
}


//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator());
app.use(express.static('public'));
app.use('/dist', express.static('public'));
app.use('/form', express.static('public'));
app.use('/machine', express.static('public'));
app.use('/market', express.static('public'));
app.use('/member', express.static('public'));
app.use('/dashboard', express.static('public/dashboard'));
app.use('/', express.static('public/home'));
app.use('/landing', express.static('public'));
app.use('/client', express.static('public'));
app.use(favicon(path.join(__dirname, '..', '/public/assets/favicon.ico')));
app.use(cors())

///////////////////////////////////////////////////////////////////////
/////////////////// messaging alert for platform errors ///////////////
//////////////////////////////////////////////////////////////////////

const mailObject = {
  from: '"ChaoticBots 👥" <chaoticbotshelp@gmail.com>',
  to: 'dangorlov@yahoo.com',
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

const sms =      express.Router();
const db =       express.Router();
const git =      express.Router();
//const web =      express.Router();
const auth =     express.Router();
const errs =     express.Router();
const unk =      express.Router();
const help =     express.Router();

require('../routes/auth')(auth);
require('../routes/db')(db);
require('../routes/git')(git);
require('../routes/sms')(sms);
//require('../routes/web')(web);
require('../routes/unk')(unk);
require('../routes/error')(errs);
require('../routes/help')(help);

//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// auth test
app.use(auth)
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
