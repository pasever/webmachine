import React from 'react';

// skills counter component
const SkillsAvailable = props => 
 
    <div className="agents-available skills-available">
        <h1> { props.qty } { (props.qty === 1) ? 'skill' : 'skills' } available for agent <span>{ props.name }</span></h1>
    </div>;

export default SkillsAvailable;