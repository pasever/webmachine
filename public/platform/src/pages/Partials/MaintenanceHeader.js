///////////////////////////////////////////////////////////////////////
//////////////////     Maintenance Header         /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

import React from 'react';
import { Col } from '../../components/grid/'; 


/* 
REQUIRED PROPS: 
    user - the user object
    ////  FUTURE -- turn into an object
    hasErrors - boolean to tell us if we have errors and display a message 
    toggleSystem (method) - toggles when to go live, if we can go life
*/
export const MaintenanceHeader = ({ headerText, user, hasErrors, toggleSystem, deletePlatform }) => (
    <div className="maintenance-header">
        <div className="toggle-section">
            { user.isLive ? ( 
                <h6><i onClick={ toggleSystem } className="fa fa-toggle-on toggle"></i> system is live.</h6> ) : ( 
                <h6><i onClick={ toggleSystem} className="fa fa-toggle-off toggle"></i> system is off.</h6>
            )}
            { hasErrors ? ( 
                <h6 className="badge badge-warning">Please check the forms for errors</h6>
            ) : ( "" ) }
        </div>
        <div className="delete-section">
            <button onClick={ deletePlatform } className="btn btn-danger">{ headerText.deleteButton }</button>
        </div>
    </div>
)