'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const bodyParser =      require('body-parser')
const clone =           require('clone-deep')
const config =          require('../config').init()
const message =         require('../api/db')

const { g, b, gr, r, y } = require('../console');

let webArr = []
let webMsg = {
  message: null,
  link: null
}

exports.response = (obj, req, res) => {
  return new Promise((resolve, reject) => {
    console.log("---------RESPONSE Stage---------")

    let workObj = clone(obj)

    if (workObj.message.ChaoticSource == 'web'){
      if(workObj.response.reply.length > 0) {
        res.status(200)
        res.json(workObj.response.reply)
      } else {
        webMsg.message = "hmmmm - Like a 404. The agent never responded"
        res.status(200)
        webArr.push(webMsg)
        res.json(webArr)
      }
      webMsg.message = null
      webMsg.link = null
      webArr = []
      resolve(obj)
      return
    }

  })
}
