///////////////////////////////////////////////////////////////////////
////////////////////      DASHBOARD APP.JS     ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

"use strict";

import React, { Component } from "react";
import API from "../../common/utils/API";
import URI from "../../common/utils/URI";
import Auth from "../../home/src/Pages/Auth/Auth";
import LoadingPage from "../../common/LoadingPage";
import { Col, Row, Container, FlexWrapper, FlexItem } from "../../common/grid";
import { Button } from "../../common/form";
import { DashNetworks, DashMembers } from "./components";
import { DashHeader, LaunchClientForm } from "./partials";
import { ErrorBoundary } from "../../common/error";
import "./App.css";
import "../../common/styles/animate.css";

const config = require("../../../config").init();
const auth = new Auth("/dashboard");

/**
 * @class DashboardComponent
 *
 * @description A registered member can access this portion.  The registered member can decide to:
 *   * Join a network
 *   * Manage their profile for a network
 *   * Create a network (Client)
 *   * Manage a network they own (Client)
 *
 * @author DGO
 */

export default class DashboardComponent extends Component {
  state = {
    isLoading: true, // If the page is loading - use this flag to display the LoadingPage component
    launchingNetwork: false, // Used to flag for rendering purposes
    ownedNetworks: [],
    joinedNetworks: [],
    pageData: {} // Holds the pageData (text to display)
  };

  constructor(props) {
    super(props);
    this.launchNetwork = this.launchNetwork.bind(this);
  }

  /**
   * @function: getDashboardPageData()
   * @description gets our json file which contains the text for the entire component
   */
  getDashboardPageData() {
    return new Promise((resolve, reject) => {
      fetch("/dashboard/static/dashboardPageData.json")
        .then(resp => {
          let json = resp;
          return { json, resolve };
        })
        .then(({ json, resolve }) => resolve(json));
    });
  }

  /**
   * @function: launchNetwork()
   * @description Changes our state to launching a network.
   */
  launchNetwork() {
    this.setState({ launchingNetwork: !this.state.launchingNetwork });
  }

  /**
   * @function: componentDidMount()
   * @description gets the text to display, and makes API calls to get the networks the user owns and is a member of.
   */
  componentDidMount() {
    if (!auth.isAuthenticated()) auth.login();

    let pageData = this.getDashboardPageData().then(resp => {
      return resp.json();
    });
    let ownedNetworks = API.client.getClientsByAccessId();
    let joinedNetworks = API.client.getJoinedNetworks();

    Promise.all([pageData, ownedNetworks, joinedNetworks])
      .then(values => {
        this.setState({
          pageData: values[0],
          ownedNetworks: values[1].data,
          joinedNetworks: values[2].data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        auth.login();
      });
  }

  /**
   * @function: renderLeftColumn()
   * @description
   */
  renderLeftColumn() {
    if (!this.state.launchingNetwork) {
      return (
        <DashNetworks
          text={this.state.pageData.main}
          launchNetwork={this.launchNetwork}
          clients={this.state.ownedNetworks}
        />
      );
    } else {
      return <LaunchClientForm goBack={this.launchNetwork} />;
    }
  }

  renderRightColumn() {
    return (
      <DashMembers
        text={this.state.pageData.main}
        clients={this.state.joinedNetworks}
      />
    );
  }

  render() {
    return (
      <ErrorBoundary>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <DashHeader text={this.state.pageData.main} />
            <FlexWrapper>
              {this.renderLeftColumn()}
              {this.renderRightColumn()}
            </FlexWrapper>
          </div>
        )}
      </ErrorBoundary>
    );
  }
}
