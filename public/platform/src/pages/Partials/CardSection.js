///////////////////////////////////////////////////////////////////////
//////////////////     Credit Card Info Form      /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO


import React, { Component } from 'react';
import {CardElement, PostalCodeElement} from 'react-stripe-elements';


/// Displays the credit card enter fields from stripe
export const CardSection = () => 
    <div className="form-group">
        <label>Card details</label>
        <CardElement 
            style={{ base: {fontSize: "18px" }}} 
            className="form-control" />
    </div>  

