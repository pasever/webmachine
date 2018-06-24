///////////////////////////////////////////////////////////////////////
////////////////////      DASHBOARD APP.JS     ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

"use strict";

import React, { Component } from "react";
import API from "Common/utils/API";
import URI from "Common/utils/URI";
import Auth from "../../home/src/Pages/Auth/Auth";
import LoadingPage from "Common/LoadingPage";
import { BackHome } from 'Common/navigation';
import { Col, Row, Container, FlexWrapper, FlexItem } from "Common/grid";
import { Button } from "Common/form";
import { DashNetworks, DashMembers } from "./components";
import UpdateMemberProfile from './components/UpdateMemberProfile';
import { DashHeader, LaunchClientForm } from "./partials";
import { ErrorBoundary } from "Common/error";
import "./App.css";
import "Common/styles/animate.css";

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
    pageData: {}, // Holds the pageData (text to display),
    profile: {
      update: false,
      updateForClient: {
        name: '',
        id: ''
      }
    }
  };

  constructor(props) {
    super(props);
    this.launchNetwork = this.launchNetwork.bind(this);
    this.handleCallToUpdateProfile = this.handleCallToUpdateProfile.bind(this);
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
        auth.login('/dashboard');
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

  /**
   * @description
   * By default, it renders all networks of which current user is a member.
   * If user whishes to update their info for a particular network by clicking
   * on that network's icon/button, this section will re-render and return a
   * component that lets the user do just that.
   * @author JCG
   */
  renderRightColumn() {
    return (
      <FlexItem classes="animated fadeIn light-shadow text-center">

        {!this.state.profile.update ? (
          <DashMembers
            text={this.state.pageData.main}
            clients={this.state.joinedNetworks}
            handleCallToUpdateProfile={this.handleCallToUpdateProfile}
          />
        ) : (
          <UpdateMemberProfile
            clientId={this.state.profile.updateForClient.id}
            clientName={this.state.profile.updateForClient.name}
            handleCallToUpdateProfile={this.handleCallToUpdateProfile}
          />
        )}

      </FlexItem>
    )
  }

  /**
   * @method handleMemberProfileUpdate
   * @param {Boolean} shouldUpdate 
   * @param {String} clientId
   * @description
   * 
   */
  handleCallToUpdateProfile(shouldUpdate, clientId, clientName) {
    let { profile } = this.state;
    profile.update = shouldUpdate;
    profile.updateForClient.id = clientId;
    profile.updateForClient.name = clientName;

    this.setState({ profile });
  }

  render() {
    return (
      <ErrorBoundary>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <DashHeader text={this.state.pageData.main} />

            <BackHome />

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
