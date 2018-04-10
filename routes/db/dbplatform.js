'use strict';

///////////////////////////////////////////////////////////////
////////     process db http message for platforms     ///////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const pApi =         			require('../../api/platform')
const { r, g, b } =             require('../../console');
const dbplatform = (router) => {

	router.use(bodyParser.json());
    

    router.delete("/", (req, res, next) => {
        console.log("-----------DB Platforms DELETE ROUTE -----------");
        pApi.deletePlatform(req.token, req.body.id, req.conn, (response) => {
            res.status(200).send(response);
		    next();
 	    });
    });
/*
	router.get('/', (req, res, next) => {
        console.log("-----------DB Platforms GET ROUTE -----------");
		pApi.getPlatforms(req.token, req.conn, (response) => {
			res.status(200).send(response);
			next();
        });
    });*/
    router.get('/', (req, res, next) => {
        console.log("-----------DB Platforms GET ROUTE -----------");
        if(req.query.cid) {            
            pApi.getPlatformByCId(req.token, req.query.cid, req.conn, (response) => {
                res.status(200).send(response);
            });
        } else {
            let err = new Error('Error GET DB - Client ID Not Provided!');
            res.status(403).send(err.message);
            next(err);
        }
    });
    
    router.post('/', (req, res, next) => {
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

    router.put('/', (req, res, next) => {
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
    router.post('/addStripeSource', (req, res, next) => {
        if(req.body.cId && req.body.sId) {
            pApi.addStripeSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log("RESPONSE --- ", response);
                res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Post Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }

    })
    router.post('/setDefaultSource', (req, res, next) => {
        
        if(req.body.cId && req.body.sId) {
            pApi.setDefaultSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log(g("RESPONSE --- ", response));
                res.status(200).send(response);
            })
        } else {
            let err = new Error('Error Update Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);            
        }
    }) 
    router.post('/removeSource', (req, res, next) => {
        if(req.body.cId && req.body.sId) {
            pApi.removeSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log(g("RESPONSE --- ", response));
                res.status(200).send(response);
            })
        } else {
            let err = new Error('Error Remove Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);            
        }
    })

}

module.exports = dbplatform;