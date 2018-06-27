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
<<<<<<< HEAD
import API from "../../common/utils/API";
import URI from "../../common/utils/URI";
import LoadingPage from "../../common/LoadingPage";
import Auth from "../../home/src/Pages/Auth/Auth";
import { MaintenanceHeader } from "./components/Partials/";
import { Container, Row } from "../../common/grid";
import { ErrorBoundary } from "../../common/error/ErrorBoundary";
import MaintenanceWrapper from "./components/Maintenance/MaintenanceWrapper";

=======
import API from "Common/utils/API";
import URI from "Common/utils/URI";
import LoadingPage from "../../common/LoadingPage";
import Auth from "../../home/src/Pages/Auth/Auth";
import { MaintenanceHeader } from "./components/Partials/";
import { Input, Button } from 'Common/form';
import { Container, Row } from "Common/grid";
import { ErrorBoundary } from "Common/error/ErrorBoundary";
import MaintenanceWrapper from "./components/Maintenance/MaintenanceWrapper";

import Modal from "react-responsive-modal";
>>>>>>> upstream/master
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
<<<<<<< HEAD
      client: null, //  should be passed in the response from Authorization
      pageData: null, //  page data object
      hasErrors: false //  flags if we should display a message about errors
=======
      client: null,       //  should be passed in the response from Authorization
      pageData: null,     //  page data object
      hasErrors: false,   //  flags if we should display a message about errors
      launchModal: false,
      deleteName: "",
      errorDelete: "",
>>>>>>> upstream/master
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

<<<<<<< HEAD
=======
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

>>>>>>> upstream/master
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
<<<<<<< HEAD
  deletePlatform = event => {
    event.preventDefault();
    API.client.deleteClient(this.state.client).then(resp => {
      this.setState({ client: resp.data });
    });
  };

=======
  deleteClient = event => {
    event.preventDefault();
    if(this.state.deleteName !== this.state.client.name) {
      this.setState({ errorDelete: "Names do not match."});
      return;
    } else {
      API.client.deleteClient(this.state.client).then(resp => {
        //this.setState({ client: resp.data });
        URI.redirect('/dashboard');
      });
    } 
  };
>>>>>>> upstream/master
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

<<<<<<< HEAD
=======
  toggleModal = () => {
    const { launchModal } = this.state;
    this.setState({ launchModal: !launchModal, errorDelete: "" })
  }
>>>>>>> upstream/master

  render() {
    return (
      <div className="app-container animated fadeIn">
<<<<<<< HEAD
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
=======
        {this.state.pageData === null && !this.state.redirectToLogin ? (
          <LoadingPage />
        ) : (
          <div className="animated fadeIn">
            <Modal open={this.state.launchModal} className="modal" onClose={this.toggleModal } center>
              <h2>DANGER ZONE</h2>
              <p>You are about to remove your Network<br />
              This action <strong>cannot</strong> be undone!</p>
              <p><strong>Type in the name of your network exactly as it appears</strong></p>
              <h3 className="danger-text">{ this.state.client.name }</h3>
              <form onSubmit={ this.deleteClient } method="GET" className="floating-form">
                <Input name="deleteName" value={ this.state.deleteName }
                  onChange={this.handleInputChange }
                  errorText={ this.state.errorDelete }
                />
                <Button style="danger" type="submit" text="Continue and Delete" />
              </form>
                
              
            </Modal>
            <header className="app-header">
              <h1 className="header-title">
                {this.state.pageData.main.title}
              </h1>
            </header>
            <main className="app-content">
              <ErrorBoundary>
                <Container>
                  <Row>
                    <a href="/dashboard">
                      <i className="fa fa-arrow-left" /> Return to Dashboard
                    </a>
                    {this.state.client.isDeleted ? (
                      <h2>This platform has been deleted</h2>
                    ) : (
                      <div className="drop-row">
>>>>>>> upstream/master
                        <MaintenanceHeader
                          toggleSystem={this.toggleSystem}
                          client={this.state.client}
                          hasErrors={this.state.hasErrors}
                          headerText={this.state.pageData.header}
<<<<<<< HEAD
                          deletePlatform={this.deletePlatform}
=======
                          launchModal={this.toggleModal }
>>>>>>> upstream/master
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
<<<<<<< HEAD
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
=======
                      </div>
                    )}
                  </Row>
                </Container>
              </ErrorBoundary>
            </main>
          </div>
          /* END pageData CHECK */
        )}
>>>>>>> upstream/master
      </div>
    );
  }
}
