'use strict';

///////////////////////////////////////////////////////////////
////////     process db http message for platforms     ///////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const pApi =         			require('../../api/platform')
const { r, g, b } =             require('../../console');
const dbplatform = (router) => {

	router.use(bodyParser.json());
    

    router.delete("/:id", (req, res, next) => {
 	    console.log("-----------DB Platforms DELETE ROUTE -----------");
 	    pApi.deletePlatform(req.token, req.params.id, req.conn, (response) => {
            res.status(200).send(response);
		    next();
 	    });
    });

	router.get('/', (req, res, next) => {
        console.log("-----------DB Platforms GET ROUTE -----------");
		pApi.getPlatforms(req.token, req.conn, (response) => {
			res.status(200).send(response);
			next();
        });
    });
    router.get('/:id?/:pid?', (req, res, next) => {
        console.log("-----------DB Platforms GET ROUTE -----------");
        
        if(req.params.id) {
            pApi.getPlatform(req.token, req.params.id, req.conn, (response) => {
                res.status(200).send(response);
            });
        } else if(req.params.pid) {
            pApi.getPlatformByPId(req.token, req.params.pid, req.conn, (response) => {
                res.status(200).send(response);
            })
        }
        next();
    });
    
    router.post('/', function(req, res, next) {
        console.log("-----------DB Platforms POST ROUTE -----------");
        if (req.body) {
            pApi.updatePlatform(req.token, req.body, req.conn, function(response){
                res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Post DB - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }
    });

    router.put('/', function(req, res, next) {
        console.log("-----------DB Platforms PUT ROUTE -----------");
        
        if (req.body) {
            pApi.addPlatform(req.token, req.body, req.conn, (response) => {
                console.log("RESPONSE --- ", response);
		        res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Put DB - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }
    });

}

module.exports = dbplatform;