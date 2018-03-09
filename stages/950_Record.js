'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const uuidv1 =                require('uuid/v1')
const config =                require('../config').init()
const clone =                 require('clone-deep')
const { g, b, gr, r, y } = require('../console');

// at this stage, obj has a complete record of the interaction. Record to db

exports.record = (obj, req) => {
  console.log("----------Record Stage-------------")
  return new Promise((resolve, reject) => {

    // no record being made of mock interactions
    resolve(obj)
  })
}
