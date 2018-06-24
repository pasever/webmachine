////////////////////////////////////////////////////
//////    Client wrapper for DB functions    /////
////////////////////////////////////////////////////
/// DGO - 04/30/18 - REFACTOR 0.7
/// Accompanying INDEX file for the DB.JS

const clone =           require('clone-deep')
const uuidv1 =          require('uuid/v1')
const db =              require('./db')
const { r, g } =        require('../../console');

// Gets all clients
exports.getClients = (token, accessId, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Clientss PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getClients(accessId, conn);
        return result;
    }
}


// Gets a single client by id
exports.getClient = (token, id, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Client PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getClient(id, conn);
        return result;
    }
}

exports.getJoinedClients = (token, accessId, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET JoinedClients PROCESSING");
        console.log(err);
    });
    async function thread(conn) {
        let result = await db.getJoinedClients(accessId);
        return result;
    }
}

// Gets a/many client(s) by AuthO accessId
exports.getOneOwnedClient = (token, accessId, clientId, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Client PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getOneOwnedClient(accessId, clientId, conn);
        return result;
    }
}
  
// Adds a client to the db
exports.addClient = (token, client, conn, cb) => {
    client.id = uuidv1();
    thread(client, conn).then((result) => {
        cb(result)
    }).catch((err) => {
        console.log(r("ERROR IN Add Client PROCESSING"))
        console.log(err)
        cb(err);
    });
    // async await function to drive synchronous processing of db update
    async function thread(client, conn) {
        let result = await db.putClient(client, conn)
        return result
    }
}


// Gets clients who are operating a public network.
exports.getPublicClients = (token, conn, cb) => {
    thread(conn).then(result => {
        cb(result);
    }).catch(err => {
        console.log("ERROR IN getPublicClients PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getPublicClients(conn);
        return result;
    }
}

// Updates a client
exports.updateClient = (token, client, conn, cb) => {
    thread(client, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN updateClient PROCESSING")
        console.log(err);
        cb(err);
    })
    async function thread(client, conn) {
        let result = await db.updateClient(client, conn);
        return result;
    }
}


// Soft-Deletes a client
exports.deleteClient = (token, id, conn, cb) => {
    thread(id, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN DELETE Client PROCESSING");
        console.log(err);
        cb(err);
    })
    async function thread(id, conn) {
        let result = await db.deleteClient(id, conn)
        return result
    }
}

exports.createStripeCustomer = (token, client, conn, cb) => {
    thread(client, conn).then((result) => {
        cb(result);
    }).catch(err => {
        console.log("ERROR IN CLIENT createStripeCustomer PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(client, conn) {
        let result = await db.createStripeCustomer(client, conn);
        return result;
    }
}

// Adds a stripe source
exports.addStripeSource = (token, cId, sId, conn, cb) => {
    thread(cId, sId, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN StripeSource Client PROCESSING");
        console.log(err);
        cb(err);
    })
    async function thread(cId, sId, conn) {
        let result = await db.addStripeSource(cId, sId, conn)
        return result
    }
}

exports.setDefaultSource = (token, cId, sId, conn, cb) => {
    thread(cId, sId, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN Stripe Set Source Client PROCESSING");
        console.log(err);
        cb(err);
    })
    async function thread(cId, sId, conn) {
        let result = await db.setDefaultSource(cId, sId, conn)
        return result;
    }    
}

exports.removeSource = (token, cId, sId, conn, cb) => {
    thread(cId, sId, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN Stripe Remove Source Client PROCESSING");
        console.log(err);
        cb(err);        
    })
    async function thread(cId, sId, conn) {
        let result = await db.removeSource(cId, sId, conn);
        return result;
    }
}
