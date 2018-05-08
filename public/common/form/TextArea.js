///////////////////////////////////////////////////////////////////////
//////////////////   Platform TextArea Form Field  ////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React from "react";


/// Builds out a Bootstrap 4 (RELEASE) input group.
/* 
PROPS: 
    name - the name of the input field, 
    displayName - the display of the label, 
    cols - columns
    rows - rows
    value - the value, 
    onChange (method) - the method to handle the changing of the values, 
    byline - a byline, small text, if it exists 
    maskPhone - whether or not we should display an input box with a phone number mask
    errorText - the errorText, if it exists
*/

export const TextArea = props => (
  <div className="form-group">
    <label htmlFor={props.name} className="control-label">
      {props.displayName}
    </label>
    <textarea
      name={props.name}
      id={props.name}
      onChange={props.onChange}
      rows={props.rows}
      cols={props.cols}
      className="form-control"
      value={props.value}
    />

    {props.byline !== "" ? (
      <small className="form-text text-muted">{props.byline}</small>
    ) : (
      ""
    )}
    {props.errorText !== "" ? (
      <label className="label label-danger">{props.errorText}</label>
    ) : (
      ""
    )}
  </div>
);
