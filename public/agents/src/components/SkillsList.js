import React from 'react';
import Skill from './Skill';

// skill list components that wraps all the skills
const SkillsList = props => 
<div className="agents-container"> 
    {props.skills.map((skill, id) => 
            <Skill 
                key={id} 
                skillname={skill.skillname}
                skilltype={skill.skilltype}
                name={props.name}
            />   
        )}
</div>;


export default SkillsList;