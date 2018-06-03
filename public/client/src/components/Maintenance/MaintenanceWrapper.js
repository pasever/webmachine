//////////////////////////////////////////////////////////////////////////////////
/////////////////////      MaintenanceWrapper.js         /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///                                                                             //
///  Wrapper for the maintenance section of Client's for the webmachine         //
///  platform.                                                                  //
///                                                                             //
///  REFACTOR 0.7 - Members Whitelisting Added                                  //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////



import React, { Component } from 'react';
import { GeneralMaintenance, DbMaintenance, 
        BillingMaintenance, WebMaintenance,
        MembersMaintenance } from './';
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs';
import {Container, Row, Col } from '../../../../common/grid';
import API from '../../../../common/utils/API';

import 'react-tabs/style/react-tabs.css';
import '../../App.css';



class MaintenanceWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client:  this.props.client,             //  should be passed in the response from Authorization
            errors: {},                             //  errors object
            pageData: this.props.pageData,          //  page data object
            hasErrors: false,                       //  flags if we should display a message about errors
            isSaved: false,                         //  flags if we should inform the client data has been saved
            isSaving: false,                        //  shows the "saving" cog
        };
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    updateClient = client => {
        this.setState({ client })
    }

    // HANDLES UPDATING
    updateFormField = event => {
        event.preventDefault();
        // Grabs the attributes from the target
        const { name, value } = event.target;
        // Get the current client object from the state
        const client = this.state.client;
        // If this is a phone number, we need to remove the mask
        if(name === "sms") {
            // Handles removing mask from Phone Number input
            const number = value.replace(/\D/g, "");
            client[name] = number;
        } else
            client[name] = value;

        // Sets the updated client object back in the state
        this.setState({
            client: client
        });
        
    }

    toggleCheckbox() {
        const {client} = this.state;
        client.isPrivate = !client.isPrivate;
        this.setState({ client: client });
    }

    // Method that handles saving the client
    submitForm = event => {
        this.setState({ isSaving: true });
        event.preventDefault();
        API.client.updateClient(this.state.client).then(resp => {
            if(resp.data.errors) {
                this.setState({ errors: resp.data.errors, hasErrors: true, isSaved: false, isSaving: false });
            } else {
                this.setState({ errors: {}, hasErrors: false, client: resp.data, isSaved: true, isSaving: false });
            }
        }).catch(err => { 
            console.log(err) 
            this.setState({ isSaving: false, isSaved: false });
        });
    }
    
    render() {
        return (
            <div className="container-fluid">
                { this.state.isSaved && ( 
                    <div className="alert alert-success alert-dismissable alert-box fade show" role="alert" data-dismiss="alert" aria-label="close">
                        Changes have been saved
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>                
                    </div>
                )}
                <Tabs>
                    <TabList>
                        <Tab>Organization</Tab>
                        <Tab>Database</Tab>
                        <Tab>Web</Tab>
                        {this.state.client.isPrivate && ( <Tab>Members</Tab> )}
                        <Tab>Agents</Tab>
                        <Tab>Billing Info</Tab>
                    </TabList>
                
                    <TabPanel>
                        <Col size="12 md-8">
                            <GeneralMaintenance
                                client={ this.state.client } updateFormField={ this.updateFormField } 
                                onSubmit={ this.submitForm } errors={ this.state.errors }
                                text={ this.state.pageData.generalMaintenance } isSaving={this.state.isSaving }
                                toggleCheckbox={ this.toggleCheckbox } />      
                        </Col>
                    </TabPanel>
                    <TabPanel>
                        <Col size="12 md-8">
                            <DbMaintenance
                                client={ this.state.client } updateFormField={ this.updateFormField } 
                                onSubmit={ this.submitForm } errors={ this.state.errors }
                                text={ this.state.pageData.dbMaintenance } isSaving={this.state.isSaving } />      
                        </Col>
                    </TabPanel>
                    <TabPanel>
                        <Col size="12">
                            <WebMaintenance
                                client={ this.state.client } updateFormField={ this.updateFormField } 
                                onSubmit={ this.submitForm } errors={ this.state.errors }
                                text={ this.state.pageData.web } isSaving={this.state.isSaving } />      
                        </Col>
                    </TabPanel>
                    { this.state.client.isPrivate && (
                        <TabPanel>
                            <Col size='12'>
                                <MembersMaintenance client={this.state.client} 
                                    text={ this.state.pageData.members } />
                            </Col>
                        </TabPanel>
                    )}
                    <TabPanel>
                        <h2>Agent maintenance</h2>
                    </TabPanel>
                    <TabPanel>
                        <Col size="12">
                            <BillingMaintenance 
                                text={ this.state.pageData.billingMaintenance } 
                                client={ this.state.client } 
                                updateFormField={ this.updateFormField }
                                updateClient={ this.updateClient } />
                        </Col>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }    
}

export default MaintenanceWrapper;