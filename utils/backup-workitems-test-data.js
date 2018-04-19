/*
  * This script takes care of pulling the most
  * up to date version of test data stored in mLab,
  * and outputs it into a file named test-data.json.
  * This way we keep a local backup of the data in our
  * remote database.
  *  
 */

// Dependencies
const MongoClient     = require('mongodb').MongoClient,
      assert          = require('assert'),
      fs              = require('fs'),
      path            = require('path');

// DB Keys 
const db          = require('../config').init().db.remote;

// Construct DB uri
const uri = db.uri
            .replace('<dbuser>', db.user)
            .replace('<dbpassword>', db.password)
            .replace('<dbname>', db.name);

// Set path and name of file into which test-data will be saved
const fileName = path.resolve(__dirname, '../db/data/workitems.js');

// Open connection to the database
MongoClient.connect(uri, function(err, client) {
  // Assert that err == null
  assert.equal(null, err);
  // Set reference to machine database
  let db = client.db('machine');

  // Notify user of successful connection
  console.log('Successful connection to mLab');

  // Find all workitems in the Workitem collection
  db.collection('Workitem').find({}).toArray(function(err, workitems) {
    // Throw and error if there's one
    if (err) throw err;

    // Set header comment for file
    let fileHeader =`///////     Workitem Test Data     ///////`;
    // Stringify and prettify the returned workitems array  of objects
    let data = JSON.stringify(workitems, null, 2, 100);
    // Put it all together
    let fileContent = `'use strict'; \n\n ${fileHeader} \n\n const objStore = ${data}; \n\n module.exports = objStore;`
    
    // Save workitems data into a file
    fs.writeFile(fileName, fileContent, 'utf8', function(err) {
      if (err) {
        throw new Error('Error writing test-data into file.');
      }

      // Notify user we have finished the process
      console.log('Updated test data saved in ' + fileName);
      // Close connection to DB
      client.close();
    });
  });
});
