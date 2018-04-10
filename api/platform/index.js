////////////////////////////////////////////////////
//////    Platform wrapper for DB functions    /////
////////////////////////////////////////////////////

const clone =           require('clone-deep')
const uuidv1 =          require('uuid/v1')
const db =              require('./db')
const { r, g } =           require('../../console');

// Gets all platforms
exports.getPlatforms = (token, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Platforms PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getPlatforms(conn);
        return result;
    }
}


// Gets a single platform by id
exports.getPlatform = (token, id, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Platform PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getPlatform(id, conn);
        return result;
    }
}

// Gets a single platform by profile id
exports.getPlatformByCId = (token, cid, conn, cb) => {
    thread(conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN GET Platform PROCESSING");
        console.log(err);
        cb(err);
    });
    async function thread(conn) {
        let result = await db.getPlatformByCId(cid, conn);
        return result;
    }
}
  
// Adds a platform to the db
exports.addPlatform = (token, platform, conn, cb) => {
    platform.id = uuidv1();
    thread(platform, conn).then((result) => {
        cb(result)
    }).catch((err) => {
        console.log(r("ERROR IN Add Platform PROCESSING"))
        console.log(err)
        cb(err);
    });
    // async await function to drive synchronous processing of db update
    async function thread(platform, conn) {
        let result = await db.putPlatform(platform, conn)
        return result
    }
}

// Updates a platform
exports.updatePlatform = (token, platform, conn, cb) => {
    thread(platform, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN updatePlatform PROCESSING")
        console.log(err);
        cb(err);
    })
    async function thread(platform, conn) {
        let result = await db.updatePlatform(platform, conn);
        return result;
    }
}


// Deletes a platform
exports.deletePlatform = (token, id, conn, cb) => {
    thread(id, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN DELETE Platform PROCESSING");
        console.log(err);
        cb(err);
    })
    async function thread(id, conn) {
        let result = await db.deletePlatform(id, conn)
        return result
    }
}

// Adds a stripe source
exports.addStripeSource = (token, cId, sId, conn, cb) => {
    thread(cId, sId, conn).then((result) => {
        cb(result);
    }).catch((err) => {
        console.log("ERROR IN StripeSource Platform PROCESSING");
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
        console.log("ERROR IN Stripe Set Source Platform PROCESSING");
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
        console.log("ERROR IN Stripe Remove Source Platform PROCESSING");
        console.log(err);
        cb(err);        
    })
    async function thread(cId, sId, conn) {
        let result = await db.removeSource(cId, sId, conn);
        return result;
    }
}
