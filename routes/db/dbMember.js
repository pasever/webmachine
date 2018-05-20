'use strict';

//////////////////////////////////////////////////
//////// route for new member registration ///////
//////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const api =         			require('../../api')

const dbMember = (router) => {
  /**
   * @method POST
   * @description
   * Receives member payload and calls on DB method to insert
   * Member document. 
   */

  router.use(bodyParser.json())

  router.post('/register', (req, res) => {
    console.log('got a request');
    res.json(req.body)
  });

}

module.exports = dbMember