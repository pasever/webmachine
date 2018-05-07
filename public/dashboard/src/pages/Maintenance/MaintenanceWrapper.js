import React, { Component } from 'react';
import { UserMaintenance, DbMaintenance, 
        BillingMaintenance, WebMaintenance } from './';
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs';
import {Container, Row, Col } from '../../components/grid';
import API from '../../../utils/API';

import 'react-tabs/style/react-tabs.css';
import '../../App.css';



class MaintenanceWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:  this.props.user,                 //  should be passed in the response from Authorization
            errors: {},                             //  errors object
            pageData: this.props.pageData,          //  page data object
            hasErrors: false,                       //  flags if we should display a message about errors
            isSaved: false,                         //  flags if we should inform the user data has been saved
            isSaving: false,                        //  shows the "saving" cog
        };

    }


    // HANDLES UPDATING
    updateFormField = event => {
        event.preventDefault();
        // Grabs the attributes from the target
        const { name, value } = event.target;
        // Get the current user object from the state
        const user = this.state.user;
        // If this is a phone number, we need to remove the mask
        if(name === "sms") {
            // Handles removing mask from Phone Number input
            const number = value.replace(/\D/g, "");
            user[name] = number;
        } else
            user[name] = value;

        // Sets the updated user object back in the state
        this.setState({
            user: user
        });
        
    }
    
    // Method that handles saving the user
    submitForm = event => {
        this.setState({ isSaving: true });
        event.preventDefault();
        API.updatePlatform(this.state.user).then(resp => {
        
            if(resp.data.errors) {
                this.setState({ errors: resp.data.errors, hasErrors: true, isSaved: false, isSaving: false });
            } else {
                this.setState({ errors: {}, hasErrors: false, user: resp.data, isSaved: true, isSaving: false });
            }
        }).catch(err => { 
            console.log(err) 
            this.setState({ isSaving: false, isSaved: false });
        });
    }
    
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Organization</Tab>
                    <Tab>Database</Tab>
                    <Tab>Web</Tab>
                    <Tab>Agents</Tab>
                    <Tab>Billing Info</Tab>
                </TabList>
            
                <TabPanel>
                    <Col size="12 md-8">
                        <UserMaintenance
                            user={ this.state.user } updateFormField={ this.updateFormField } 
                            onSubmit={ this.submitForm } errors={ this.state.errors }
                            text={ this.state.pageData.userMaintenance } isSaving={this.state.isSaving } />      
                    </Col>
                </TabPanel>
                <TabPanel>
                    <Col size="12 md-8">
                        <DbMaintenance
                            user={ this.state.user } updateFormField={ this.updateFormField } 
                            onSubmit={ this.submitForm } errors={ this.state.errors }
                            text={ this.state.pageData.dbMaintenance } isSaving={this.state.isSaving } />      
                    </Col>
                </TabPanel>
                <TabPanel>
                    <Col size="12">
                        <WebMaintenance
                            user={ this.state.user } updateFormField={ this.updateFormField } 
                            onSubmit={ this.submitForm } errors={ this.state.errors }
                            text={ this.state.pageData.web } isSaving={this.state.isSaving } />      
                    </Col>
                </TabPanel>
                <TabPanel>
                    <h2>Agent maintenance</h2>
                </TabPanel>
                <TabPanel>
                    <Col size="12">
                        <BillingMaintenance 
                            text={ this.state.pageData.billingMaintenance } 
                            user={ this.state.user } 
                            updateFormField={ this.updateFormField } />
                    </Col>
                </TabPanel>
            </Tabs>
        )
    }    
}

export default MaintenanceWrapper;