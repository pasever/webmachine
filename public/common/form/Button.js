///////////////////////////////////////////////////////////////////////
//////////////////      Platform Form Button     //////////////////////
///////////////////////////////////////////////////////////////////////
// DGO
'use strict';

import React from 'react';


/* 
REQUIRED PROPS: 
    name - the name of the input field, 
    type - type e.g. submit, reset
    style - bootstrap style e.g. primary, default, success, etc. 
    text - text to display
    onClick (method) - method that fires when clicked
*/
export const Button = props => (
    <button type={props.type} onClick={ props.onClick } id={props.name} 
        className={ `btn btn-${ props.style }` }>{props.text}</button>
)   