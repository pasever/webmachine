///////////////////////////////////////////////////////////////////////
//////////////////   Platform Input Form Field  ///////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React from "react";
import "../../styles/forms.css";
import InputMask from "react-input-mask";

/// Builds out a Bootstrap 4 (RELEASE) input group.
/* 
PROPS: 
    name - the name of the input field, 
    type - type e.g. text, number, email, etc.,  
    displayName - the display of the label, 
    value - the value, 
    onChange (method) - the method to handle the changing of the values, 
    byline - a byline, small text, if it exists 
    classPrepend - font awesome class to prepend to the input group
    maskPhone - whether or not we should display an input box with a phone number mask
    width - in bootstrap columns.  1-12
    errorText - the errorText, if it exists
*/
export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.name} className="control-label">
      {props.displayName}
    </label>
    <div className="input-group">
      {!props.classPrepend ? (
        ""
      ) : (
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={props.classPrepend} />
          </span>
        </div>
      )}
      {!props.maskPhone ? (
        <input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          name={props.name}
          id={props.name}
          onChange={props.onChange}
          className={`${props.width ? "col-" + props.width : ""} form-control`}
        />
      ) : (
        <InputMask
          type={props.type}
          value={props.value}
          name={props.name}
          id={props.name}
          onChange={props.onChange}
          className="form-control"
          mask="(999) 999-9999"
          alwaysShowMask={true}
        />
      )}
    </div>
    {props.byline !== "" ? (
      <p>
        <small className="form-text text-muted">{props.byline}</small>
      </p>
    ) : (
      ""
    )}
    {props.errorText !== undefined ? (
      props.errorText.message !== undefined ? (
        <p>
          <label className="badge badge-danger">
            {props.errorText.message}
          </label>
        </p>
      ) : (
        ""
      )
    ) : (
      ""
    )}
  </div>
);
