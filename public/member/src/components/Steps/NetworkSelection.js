import React from 'react';
import { Link } from 'react-router-dom';

const NetworkSelection = () =>
  <div className="page" >
    <h4 className="form-title">First Step</h4>
    <h3 className="title">This is the Network Selection Stage</h3>
    <p className="explanation">
      Here you will be able to select available public networks you might
      be interested in joining
    </p>
    <Link to='/member-form'> Go to the Member Registration Form (Next) </Link>
  </div>

export default NetworkSelection;