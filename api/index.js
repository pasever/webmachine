

//////////////////////////////////////////////////////
//////  api wrapppers to db functions and sdks //////
////////////////////////////////////////////////////

const clone =           require('clone-deep')
const uuidv1 =          require('uuid/v1')
const db =              require('./db')
const config =          require('../config').init()


//////////////////////////////////////////////////////
/////                   AGENTS                ///////
////////////////////////////////////////////////////

      // retrieve agent configurations from mongo
      // REFACTOR -- no agent found for the machine that was identified via intent
      exports.findAgent = (obj, conn, cb) => {

        thread(obj, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Find Agent Interaction PROCESSING")
          console.log(err)
        })

        async function thread(obj, conn) {
          let result = await db.findAgent(obj, conn)
          return result
        }
      }


    // get all records in agent collections
    exports.getAgents = (token, conn, cb) => {

        thread(conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Get Agent PROCESSING")
          console.log(err)
        })

        async function thread(conn) {
          let result = await db.getAgent(conn)
          return result
        }
      }

    // update agent record
    exports.updateAgent = (token, contact, conn, cb) => {
      thread(contact, conn).then((arr) => {
        cb(arr)
      }).catch((err) => {
        console.log("ERROR IN Update Agent PROCESSING")
        console.log(err)
      })

      async function thread(contact, conn) {
        let result = await db.updateAgent(contact, conn)
        return result
      }
    }

    // add agent record
    const addAgent = (token, contact, conn, cb) => {

      thread(contact, conn).then((result) => {
        cb(result)
      }).catch((err) => {
        console.log("ERROR IN Add Agent PROCESSING")
        console.log(err)
      })
      async function thread(contact, conn) {
        let result = await db.putAgent(contact, conn)
        return result
      }
    }

    // delete agent record
    const deleteAgent = (token, id, conn, cb) => {
      thread(id, conn).then((result) => {
        cb(result)
      }).catch((err) => {
        console.log("ERROR IN DELETE Agent PROCESSING")
        console.log(err)
      })
      async function thread(id, conn) {
        let result = await db.deleteAgent(id, conn)
        return result
      }
    }

//////////////////////////////////////////////////////
/////                 CLIENTS                 ///////
////////////////////////////////////////////////////
      exports.getClients = (token, conn, cb) => {

        thread(conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN GET Member PROCESSING")
          console.log(err)
        })
        async function thread(conn) {
          let result = await db.getClients(conn)
          return result
        }
      }

      exports.addClient = (token, contact, conn, cb) => {
        contact.id = uuidv1()

        thread(contact, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Add Member PROCESSING")
          console.log(err)
        })
        // async await function to drive synchronous processing of db update
        async function thread(contact, conn) {
          let result = await db.putClient(contact, conn)
          return result
        }
      }

      exports.updateClient = (token, contact, conn, cb) => {

        thread(contact, conn).then((profileArray) => {
          cb(profileArray)
        }).catch((err) => {
          console.log("ERROR IN updateProfile PROCESSING")
          console.log(err)
        })
        async function thread(contact, conn) {
          let result = await db.updateClient(contact, conn)
          return result
        }
      }

      exports.deleteClient = (token, id, conn, cb) => {

        thread(id, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN DELETE MEMBER PROCESSING")
          console.log(err)
        })
        async function thread(id, conn) {
          let result = await db.deleteClient(id, conn)
          return result
        }
      }
