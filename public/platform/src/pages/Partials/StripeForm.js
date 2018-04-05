///////////////////////////////////////////////////////////////////////
//////////////////             Stripe Form             ////////////////
///////////////////////////////////////////////////////////////////////


import React, {Component} from 'react';
import { injectStripe } from 'react-stripe-elements';
import {Button} from '../../components/form';
import { CardSection, NameAndAddressSection } from './';
import API from '../../../utils/API';


/// The stripe form injects stripe so we can add a source to a potential customer.
//  The source will be created for a payment method that can be accessed later.
class StripeForm extends Component {    
    
    state = {
        isLoaded: false,
        errors: [],         // Errors handled as an array are listed at the top of the form
        warnings: [],       // Warnings handled as an array are listed at the top of the form    
        stripeData: {},     // StripeData ???  Probably be deprecated and a stripeObject will be attached to the user.
    }


    /// Makes sure the necessary data exists on the form.
    validateInfo() {
        const u = this.props.user,
            errors = [],
            warnings = [];

        // Pushes errors and warning messages into the arrays.
        if(u.zip === "") errors.push("Zip code is REQUIRED.");
        if(u.state.length > 2) errors.push("State abbreviation only, i.e. NC for North Carolina.");
        if(u.addressLine1 === "") warnings.push("We highly suggest entering your address.");
        if(u.city === "") warnings.push("We highly suggest entering your city.");
        if(u.state === "") warnings.push("We highly suggest entering your state");
        
        // Sets the new arrays
        this.setState({ errors: errors, warnings: warnings });
        // If there is one or more errors we fail validation
        return errors.length > 0 ? false : true;
    }

    /// Function called at the submit event.
    handleSubmit = event => {
        event.preventDefault();
        console.log(this);
        if(!this.validateInfo()) return false;
        const u = this.props.user;
        
        /// Creates a stripe source with the user information.  stripe-react-elements handles getting the card data to the source.
        this.props.stripe.createSource( 
            { owner: {
                name: u.name,
                address: {
                    line1: u.addressLine1,
                    line2: u.addressLine2,
                    city: u.city,
                },

            }, 
            usage: 'reusable', 
        }).then(resp => {
            console.log(resp);            
            API.addSourceToCustomer(this.props.user.stripeCustomerId, resp.source.id).then(resp => {
                console.log(resp);
            })
        })
        
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    { this.state.errors.map((current, index) => ( <div key={index}><h2 className="badge badge-danger" >{ current }</h2></div>)) }
                    { this.state.warnings.map((current, index) => (<div key={index}><h2 className="badge badge-warning">{ current }</h2></div>)) }
                    <NameAndAddressSection 
                        user={ this.props.user} 
                        updateFormField={ this.props.updateFormField } />
                    <CardSection />
                    <Button type="submit" text="Submit" style="default" name="signup" />
                </form>
            </div> 
        );
    }
}

export default injectStripe(StripeForm);