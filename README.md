
## Strategic Machines Web Portal

Corporate web site hosting content, services and markets for customers, partners and prospects

## Getting Set Up

Getting the app running on your local machine takes only a few steps:

1. clone the project - `git clone https://github.com/strategicmarket/webmachine.git
2. install its dependencies - `npm install`
3. Update configuration parameters
4. start the app - npm run dev

This will start create the build and start the nodejs server

The code base is isomorphic, with key configuration data shared between client and server functions

## --------------------------------------------

## Configuration updates that are needed in order to run this app in development mode

1. First, follow the instructions in the developer docs for forking and clone the application
2. Once, the application is cloned, copy the configExample, and create a folder named config
3. Open the config folder. You'll note a number of config files are available.
4. Open config.json and update key configuration parameters
- Insert the github json token for the strategicmarket test repos in config.json githubrepo object. Contact admin for token
- update gmail for account data if using the transport notifier, as well as the block of code in zserver/server
5. be sure that the /machines db on your mongodb on local host is deleted before running your project. Test data will be automatically initialized

## --------------------------------------------

## Test mode
1. The platform runs in test mode when running from localhost (isLive=false)
2. There are two configuration objects in platform.json. One points to the db of all authenticated clients for production and the other points to the db of all test clients for testing purposes. One of the objects is selected based on the boolean value of the process.env.isLive property
3. Each of the client dbs hold the array of client objects with their respective db configurations. Each database for the clients holds collections related to agents, workitems, and message interactions
4. The test databases are automatically refreshed when the servers are started in test mode. In order to restore the workitem.js test data set, however, execute the script 'npm run back-wis' if necessary. This copies a master set of test data for workitems from an mlab db

## License and Use
 [LICENSE](./LICENSE.txt)

## Contributing
 [contributing](.github/CONTRIBUTING.md)

Strategic Machines labs and affiliates

connecting businesses with the conversational economy
