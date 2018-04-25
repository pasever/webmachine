
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


## License and Use
 [LICENSE](./LICENSE.txt)

## Contributing
 [contributing](.github/CONTRIBUTING.md)

Strategic Machines labs and affiliates

connecting businesses with the conversational economy
