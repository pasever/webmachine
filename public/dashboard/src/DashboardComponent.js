///////////////////////////////////////////////////////////////////////
////////////////////      DASHBOARD APP.JS     ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

'use strict';

import React, { Component } from 'react';
import API from '../../common/utils/API';
import LoadingPage from '../../common/LoadingPage';
import { Col, Row, Container, FlexWrapper, FlexItem } from '../../common/grid';
import { Button } from '../../common/form';
import { DashNetworks } from './components';
import { DashHeader } from './partials';
import { ErrorBoundary } from '../../common/error'
import './App.css';

const config = require('../../../config').init();


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
        isLoading: true,            // If the page is loading - use this flag to display the LoadingPage component
        launchingNetwork: false,    // Used to flag for rendering purposes
        pageData: {},               // Holds the pageData (text to display)
    }


    /**
     * @function: getDashboardPageData()
     * @description gets our json file which contains the text for the entire component
     */
    getDashboardPageData() {
        return new Promise((resolve, reject) => { 
            fetch('/dashboard/static/dashboardPageData.json')
                .then(resp => { let json = resp; return { json, resolve }})
                .then(({ json, resolve }) => resolve(json) )
        })
    }

    /**
     * @function: launchNetwork()
     * @description Changes our state to launching a network.
     */
    launchNetwork() {
        this.setState({ launchingNetwork: !launchingNetwork });
    }

    /**
     * @function: componentDidMount()
     * @description calls the function that gets the text to display
     */
    componentDidMount() {
        let pageData = this.getDashboardPageData().then(resp => { return resp.json() });
        Promise.all([pageData]).then(values => {
            this.setState({ pageData: values[0], isLoading: false}) 
        });
    }

    /**
     * @function: renderLeftColumn()
     * @description
     */
    renderLeftColumn() {
        if(!this.state.launchingNetwork) {
            return(
                <DashNetworks 
                    pageText={this.state.pageData.main } 
                    launchNetwork={ this.launchNetwork } />            
            );
        }
    }

    renderRightColumn() {
        return(
            <FlexItem>
                <div className="light-shadow">
                    <p>SOME TEXT TEXT</p>
                </div>
            </FlexItem>
        )
    }
    render() {
        return (
            <ErrorBoundary>
            { this.state.isLoading ? ( <LoadingPage /> ) : (
                <div>
                    <DashHeader text={ this.state.pageData.main } />
                    <FlexWrapper>
                        { this.renderLeftColumn() }                
                        { this.renderRightColumn() }
                    </FlexWrapper>
                </div>
            )}
            </ErrorBoundary>
        );
    };
};