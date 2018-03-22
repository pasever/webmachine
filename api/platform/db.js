//////////////////////////////////////////////////////
//////           platform CRUD DB Ops          ///////
//////////////////////////////////////////////////////
// DGO - 03/19/18


/// Gets all platforms in the DB Collection
exports.getPlatforms = () => {
    return new Promise((resolve, reject) => {
        Platform.find({}, (err, response) => {
            if (err) {
            if (err.error !== 'not_found') {
                resolve(err)
            } else {
                reject(err)
            }};
            resolve(response);
        });
    })  
}

// Gets platform by id
exports.getPlatform = (id) => {
    return new Promise((resolve, reject) => {
        Platform.find({ where: { id: id }}, (err, response) => {
            if(err) {
                if(err.error !== 'not_found') {
                    resolve(err);
                } else {
                    reject(err);
                }
            }
            resolve(response);
        })
    })
}

// Adds a platform to the DB
exports.putPlatform = (params) => {
    let platform = new Platform(params);
    return new Promise((resolve, reject) => {
        platform.save((err, response) => {
            if (err) {
                console.log("Error When Saving Platform")
                reject(err)
            }
            resolve(response)
        })
    })
}

// Updates a platform
exports.updatePlatform = (platform) => {
    return new Promise((resolve, reject) => {
        Platform.findOneAndUpdate({id: platform.id}, platform, {upsert: true}, (err, response) => {
            if (err) {
                console.log(r("Error When Updating Platform"))
                reject(err)
            }
            resolve(response);
        })
    })
}

// Deletes a platform.  SOFTDELETE only - flags isDeleted to TRUE
exports.deletePlatform = (id) => {
    return new Promise((resolve, reject) => {
        Platform.findOneAndUpdate({id: id}, { $set:{ isDeleted: true }}, (err, response) => {
            if (err) {
                if (err.error !== 'not_found') {
                    resolve(err)
                } else {
                    reject(err)
                }
            };
            resolve(response);
        });
    })
}
