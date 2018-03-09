'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const uuidv1 =       require('uuid/v1')
const merge =        require('deepmerge')

const { g, b, gr, r, y } = require('../console');

let webMsg1 = {
  message: "Thank you for your inquiry. Our virtual agents are currently in training",
  link: undefined
}

let webMsg2 = {
  message: "Please check again later",
  link: undefined
}
let webMsg3 = {
  link: "https://github.com/strategicmachines"
}
exports.initialize = (obj, req) => {
  return new Promise((resolve, reject) => {

    console.log("-------------INITIALIZATION Stage-------------")
    // spoof of web widget interactions
    // until platform engine is hooked up
    obj.response = {}
    obj.response.reply = []
    obj.response.reply.push(webMsg1)
    obj.response.reply.push(webMsg2)
    obj.response.reply.push(webMsg3)
    resolve(obj)
  })
}
