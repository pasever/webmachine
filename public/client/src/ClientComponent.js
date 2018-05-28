///////////////////////////////////////////////////////////////////////
////////////////////      Client APP.JS        ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

"use strict";

import React, { Component } from "react";
import API from "../../common/utils/API";
import URI from "../../common/utils/URI";
import LoadingPage from "../../common/LoadingPage";
import Auth from "../../home/src/Pages/Auth/Auth";
import { MaintenanceHeader } from "./components/Partials/";
import { Container, Row, Col } from "../../common/grid";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../../common/error/ErrorBoundary";
import MaintenanceWrapper from "./components/Maintenance/MaintenanceWrapper";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import "../../common/styles/animate.css";

const config = require("../../../config").init();
const auth = new Auth();
//////// DEFAULT PLATFORM
// Deprecated 04/30/18 for REFACTOR 0.7
//const Platform = require('../../../config/').platform();

// The APP class is currently the main hub for the Client.
// It requires the client object, so it will handle all form changes and submits.
export default class ClientComponent extends Component {
  // ctor
  constructor(props) {
    super(props);

    this.state = {
      client: null, //  should be passed in the response from Authorization
      pageData: null, //  page data object
      hasErrors: false //  flags if we should display a message about errors
    };
  }

  /// GRABS OUR PAGE DATA.  THIS IS WHERE ALL THE TEXT EXISTS FOR THE PLATFORM PAGES.  TO MAKE CHANGES SEE ../static/platformPageData.json
  getClientPageData() {
    return new Promise((resolve, reject) => {
      fetch("/client/static/clientPageData.json")
        .then(resp => {
          let json = resp;
          return { json, resolve };
        })
        .then(({ json, resolve }) => resolve(json));
    });
  }

  /// When the component mounts, we will try and get all of the platform text and the client object from token.
  componentDidMount() {
    // Gets our platform page data
    const data = this.getClientPageData().then(resp => {
      return resp.json();
    });

    // Grabs the Id in the query string, and tests if the User has permission to edit this client
    // via their Id.
    const client = API.client.getClientForMaintenance(
      URI.getQuerystringValue("clientId")
    );

    // Waits till all promises are fulfilled to proceed.
    Promise.all([data, client])
      .then(values => {
        let client = values[1];
        // Checks to see if we got no data or if our token was rejected
        if (
          Object.keys(client.data).length === 0 ||
          client === "TOKEN REJECTED"
        ) {
          auth.login();
        } else {
          this.setState({ pageData: values[0], client: client.data });
        }
      })
      .catch(err => {
        auth.login();
      });
  }

  /// When the component mounts, we will try and get all of the platform text and the client object from token.
  componentDidMount() {
    // Gets our platform page data
    const data = this.getClientPageData().then(resp => {
      return resp.json();
    });

    // Grabs the Id in the query string, and tests if the User has permission to edit this client
    // via their Id.
    const client = API.client.getClientForMaintenance(
      URI.getQuerystringValue("clientId")
    );

    // Waits till all promises are fulfilled to proceed.
    Promise.all([data, client])
      .then(values => {
        let client = values[1];
        console.log(values);
        /// FOR TESTING PURPOSES.  GRABS THE DEFAULT DATA.
        if (
          Object.keys(client.data).length === 0 ||
          client === "TOKEN REJECTED"
        ) {
          this.setState({ redirectToLogin: true });
        } else {
          this.setState({ pageData: values[0], client: client.data });
        }
      })
      .catch(err => {
        console.log("ERROR ON MOUNT: ", err);
        this.setState({ redirectToLogin: true });
      });
  }

  // Method that handles the clicking of the DELETE PLATFORM button.
  ///  FUTURE - SOME MORE WARNING SHOULD BE GIVEN BEFORE THE USER ACTUALLY HAS THEIR PLATFORM FLAGGED FOR DELETION.
  deletePlatform = event => {
    event.preventDefault();
    API.client.deleteClient(this.state.client).then(resp => {
      this.setState({ client: resp.data });
    });
  };

  /// TOGGLES THE SYSTEM GOING LIVE.
  /// NON-FUNCTIONAL
  toggleSystem = () => {
    //// RUN A TEST IF THE SYSTEM CAN GO LIVE!!
    ////
    let client = this.state.client;
    client.isLive = !client.isLive;

    //// DON'T JUST UPDATE THE STATE - SAVE THE USER!
    this.setState({ client: client });
  };
  /// Calls the URI utility function to redirect to the login page
  render() {
    return (
      <div className="app-container animated fadeIn">
        <div>
          {this.state.pageData === null && !this.state.redirectToLogin ? (
            <LoadingPage />
          ) : (
            <div className="animated fadeIn">
              <header className="app-header">
                <h1 className="header-title">
                  {this.state.pageData.main.title}
                </h1>
              </header>
              {this.state.client.isDeleted ? (
                <h2>This platform has been deleted</h2>
              ) : (
                <main className="app-content">
                  <ErrorBoundary>
                    <Container>
                      <Row>
                        <MaintenanceHeader
                          toggleSystem={this.toggleSystem}
                          client={this.state.client}
                          hasErrors={this.state.hasErrors}
                          headerText={this.state.pageData.header}
                          deletePlatform={this.deletePlatform}
                        />
                        {this.state.isSaved ? (
                          <span className="badge badge-success">
                            Changes have been saved.
                          </span>
                        ) : null}
                        <MaintenanceWrapper
                          client={this.state.client}
                          pageData={this.state.pageData}
                        />
                      </Row>
                    </Container>
                  </ErrorBoundary>
                </main>
                /* END isDeleted CHECK */
              )}
            </div>
            /* END pageData CHECK */
          )}
        </div>
      </div>
    );
  }
}
