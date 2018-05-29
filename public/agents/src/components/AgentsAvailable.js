import React from 'react';


const AgentsAvailable = props => 
 
    <div className="agents-available">
        <h1> { props.qty } { (props.qty === 1) ? 'agent' : 'agents' } available </h1>
    </div>;

export default AgentsAvailable;