import React from 'react';
import Agent from './Agent';


const AgentList = props => 
<div className="agents-container"> 
    {props.agents.map((agent, id) => 
            <Agent 
                key={agent.id} 
                name={agent.name}
                handle={agent.handle}
                handler={agent.handler}
                id={agent.id}
                avatar={agent.avatar}
                skills={agent.skills}
                onAgentClick={props.onAgentClick}
            />   
        )}
</div>;


export default AgentList;