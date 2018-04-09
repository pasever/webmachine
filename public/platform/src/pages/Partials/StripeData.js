///////////////////////////////////////////////////////////////////////
//////////////////        Stripe Data Info Form        ////////////////
///////////////////////////////////////////////////////////////////////
// DGO


import React from 'react';

export const StripeData = ({ stripeCust }) => (
    <div>
        <div className="stripe-data-wrapper">
            {stripeCust.account_balance ? (
                <div>
                    <div className="stripe-item">
                        <span>Account Balance : </span>
                    </div>
                    <div className="stripe-item">
                        <span>${ stripeCust.account_balance }</span>
                    </div>
                </div>
            ) : ""}
        </div>
        <div className="stripe-data-wrapper">
            { stripeCust.sources === null ? ("") : (
            <div className="stripe-source">
                <h2>Card info</h2>
                {stripeCust.sources.data.map((current, idx) => (
                    <p key={idx}>                        
                         <i className={ `fa fa-cc-${ current.card.brand.replace(" ", "-").toLowerCase() } fa-2x`}></i>
                         <span>Last 4 digits: { current.card.last4 }</span>
                    </p>
                )) }
            </div>
        )}
        </div>
        
    </div>
);
