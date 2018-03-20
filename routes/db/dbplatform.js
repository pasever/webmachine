'use strict';

///////////////////////////////////////////////////////////////
////////     process db http message for platforms     ///////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const pApi =         			require('../../api/platform')

const dbplatform = (router) => {

	router.use(bodyParser.json());
    
    router.delete("/:id", (req, res, next) => {
 	    console.log("-----------DB Platforms ROUTE -----------");
 	    pApi.deletePlatform(req.token, req.params.id, req.conn, (response) => {
            res.status(200).send(response);
		    next();
 	    });
    });

	router.get('/', (req, res, next) => {
        console.log("-----------DB Platforms ROUTE -----------");
		pApi.getPlatforms(req.token, req.conn, (response) => {
			res.status(200).send(response);
			next();
        });
    });
    router.get('/:id', (req, res, next) => {
        console.log("-----------DB Platforms ROUTE -----------");
        pApi.getPlatform(req.token, req.params.id, req.conn, (response) => {
            res.status(200).send(response);
            next();
        });
    });
    router.post('/', function(req, res, next) {
        console.log("-----------DB Platforms ROUTE -----------");
        if (req.body) {
            pApi.updateClient(req.token, req.body, req.conn, function(response){
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
        console.log("-----------DB Platforms ROUTE -----------");
        if (req.body) {
            pApi.addPlatform(req.token, req.body, req.conn, function(response) {
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