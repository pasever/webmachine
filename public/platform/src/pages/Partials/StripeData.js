///////////////////////////////////////////////////////////////////////
//////////////////        Stripe Data Info Form        ////////////////
///////////////////////////////////////////////////////////////////////
// DGO


import React from 'react';

export const StripeData = ({ stripeCust }) => (
    <div>
        <div className="stripe-data-wrapper">
            <div className="stripe-item">
                <span>Account Balance : </span>
            </div>
            <div className="stripe-item">
                <span>${ stripeCust.account_balance }</span>
            </div>
        </div>
        <div className="stripe-data-wrapper">
            <div className="stripe-item">
                <span>Account Balance : </span>
            </div>
            <div className="stripe-item">
                <span>${ stripeCust.account_balance }</span>
            </div>
        </div>
    </div>
);
