///////////////////////////////////////////////////////////////////////
//////////////////   Platform Input Form Field  ///////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

import React from 'react';
import '../../styles/forms.css';
import InputMask from 'react-input-mask';

/// Builds out a Bootstrap 4 (RELEASE) input group.
/* 
PROPS: 
    name - the name of the input field, 
    type - type e.g. text, number, email, etc.,  
    displayName - the display of the label, 
    value - the value, 
    onChange (method) - the method to handle the changing of the values, 
    byline - a byline, small text, if it exists 
    maskPhone - whether or not we should display an input box with a phone number mask
    errorText - the errorText, if it exists
*/
export const Input = (props) => (
    <div className="form-group">
        <label htmlFor={ props.name }>{ props.displayName }</label>
        { !props.maskPhone ? ( 
            <input type={ props.type } value={ props.value } placeholder={ props.placeholder } 
                name={props.name} id={props.name} onChange={ props.onChange } className="form-control"/>
        ) : (
            <InputMask type={ props.type } value={ props.value } name={props.name} 
                id={props.name} onChange={ props.onChange } className="form-control"
                mask="(999) 999-9999" alwaysShowMask={ true } />
        )}
        
        { props.byline !== "" ? (
            <small className="form-text text-muted">{ props.byline }</small>
        ) : ( 
            "" 
        )}
        { props.errorText !== "" ? (
            <label className="label label-danger">{ props.errorText }</label>
        ) : (
            ""
        )}
    </div>
);

