//////////////////////////////////////////////////////////////////////////////////
/////////////////////      ClientComponent.js            /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///  Base component Client maintenance                                          //
///  REFACTOR 0.7 REMOVED UNNECESSARY IMPORTS                                   //
///                                                                             //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////


// 05/02/18 - REFACTOR 0.8
// DGO

"use strict";

import React, { Component } from "react";
import API from "../../common/utils/API";
import URI from "../../common/utils/URI";
import LoadingPage from "../../common/LoadingPage";
import Auth from "../../home/src/Pages/Auth/Auth";
import { MaintenanceHeader } from "./components/Partials/";
import { Container, Row } from "../../common/grid";
import { ErrorBoundary } from "../../common/error/ErrorBoundary";
import MaintenanceWrapper from "./components/Maintenance/MaintenanceWrapper";

import "react-tabs/style/react-tabs.css";
import "./App.css";
import "../../common/styles/animate.css";

const auth = new Auth();


/**
 * @class ClientComponent
 * @description The base component for Client Maintenance
 * 
 * @author DGO
 */
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

  /**
   * @function getClientPageData
   * @description gets the text for our entire component
   */
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

  /**
   * @description 
   * STEPS:
   * 1. Call for the page data
   * 2. Grab the clientId which should be passed as a URI parameter
   * 3. Grab the Client from the DB that references the _id.
   */
  componentDidMount() {
    // Gets our page data see /static/clientPageData.json
    const data = this.getClientPageData().then(resp => {
      return resp.json();
    });

    let clientId = URI.getQuerystringValue("clientId")
    const client = API.client.getClientForMaintenance(clientId);

    // Waits till all promises are fulfilled to proceed.
    Promise.all([data, client]).then(values => {
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
    }).catch(err => {
      auth.login(clientId ? '/client?clientId=' + clientId : "");
    });
  }

  /**
   * @todo run some security checks to make sure this is what the user wants to do.
   */
  deletePlatform = event => {
    event.preventDefault();
    API.client.deleteClient(this.state.client).then(resp => {
      this.setState({ client: resp.data });
    });
  };

  /**
   * @function toggleSystem
   * @description allows a user to make their system live
   * @todo 
   * Check to make sure: agents are selected, billing info is entered, db info is proper.
   * Properly save isLive to the database.
   */
  toggleSystem = () => {
    let client = this.state.client;
    client.isLive = !client.isLive;

    //// DON'T JUST UPDATE THE STATE - SAVE THE USER!
    this.setState({ client: client });
  };


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
                        <a href="/dashboard">
                          <i className="fa fa-arrow-left" /> Return to Dashboard
                        </a>
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
