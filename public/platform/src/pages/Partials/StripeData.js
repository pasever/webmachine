///////////////////////////////////////////////////////////////////////
//////////////////        Stripe Data Info Form        ////////////////
///////////////////////////////////////////////////////////////////////
// DGO


import React from 'react';

export const StripeData = ({ stripeCust, changeSource, removeSource }) => (
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
            { stripeCust.sources.data.length === 0 ? (
                <h2>Please add a card</h2>
            ) : (
            <div className="stripe-source">
                <h2>Card info</h2>
                {stripeCust.sources.data.map((current, idx) => (
                    <table key={idx} className="">
                        <tbody>
                            <tr rowSpan='2'>
                                <td width="100">
                                    <i className={ `fa fa-cc-${ current.card.brand.replace(" ", "-").toLowerCase() } fa-2x`}></i>
                                </td>
                                <td><span className="card-info">Last 4 digits: </span></td>
                                <td><span className="card-info"> { current.card.last4 }</span></td>
                                <td>
                                    <span className="remove-src color-red">
                                        <i className="fa fa-close" onClick={ removeSource }><small data-source-id={ current.id}>Remove.</small></i>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>{ stripeCust.default_source === current.id ? ( <span><i className="fa fa-check"></i> <small>Default</small></span>) : ( 
                                    <span className="set-default-src">
                                        <i className="fa fa-close" onClick={ changeSource } > <small data-source-id={current.id}>Set default.</small></i> 
                                    </span> ) }
                                </td>
                                <td><span className="card-info">Expires:</span></td>
                                <td><span className="card-info"> { `${current.card.exp_month}/${current.card.exp_year}`}</span></td>
                            </tr>
                         </tbody>                        
                    </table>
                )) }
            </div>
        )}
        </div>
        
    </div>
);
