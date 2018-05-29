///////////////////////////////////////////////////////////////////////
//////////////////      Platform Form Button     //////////////////////
///////////////////////////////////////////////////////////////////////

'use strict';

import React from 'react';
import '../styles/button.css';

/** 
  * @class Button
  * @description 
  * Creates a button using Bootstrap 4 styles, plus some common styling.
  * @prop name - the name of the input field, 
  * @prop type - type e.g. submit, reset
  * @prop style - bootstrap style e.g. primary, default, success, etc. 
  * @prop text - text to display
  * @prop { function } onClick - method that fires when clicked
  * @author DGO
*/
export const Button = props => (
    <button type={props.type} onClick={ props.onClick } id={props.name} 
        className={ `btn btn-${ props.style }` }>{props.text}</button>
)   