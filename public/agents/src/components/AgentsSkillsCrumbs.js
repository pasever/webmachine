import React from 'react';


const AgentsSkillsCrumbs = props =>
  <nav aria-label="breadcrumb" className="breadcrumbs">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href='/agents'>Agents</a></li>
            <li className="breadcrumb-item breadcrumb-name">{props.name}</li>
            <li className="breadcrumb-item">Skills</li>
        </ol>
    </nav>;

export default AgentsSkillsCrumbs;