///////////////////////////////////////////////////////////////////////
////////////////     Billing Maintenance Page       ///////////////////
///////////////////////////////////////////////////////////////////////
// DGO


'use strict';

import React, { Component } from 'react';
import { Container, Col, Row } from '../../components/grid/';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import {StripeProvider, Elements, PaymentRequestButtonElement, injectStripe } from 'react-stripe-elements';
import { StripeFormWrapper } from '../Partials';
import '../../styles/maintenancepage.css';


const config = require('../../../../../config/').init();


/// FUTURE - Send User object, and check if the user is in Stripe.
export class BillingMaintenance extends Component {

    render() {
        return(
            <ErrorBoundary>
                { this.props.text.title ? ( <h2>{ this.props.text.title }</h2> ): ("")}
                { this.props.text.body ? ( <p>{ this.props.text.body }</p> ) : ("") }
                <StripeProvider apiKey={ config.stripe.publishKey }>
                    <StripeFormWrapper 
                        user= { this.props.user } 
                        updateFormField={ this.props.updateFormField } />
                </StripeProvider>
            </ErrorBoundary>        
        )
    }
}

