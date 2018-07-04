import React from 'react';
import Agent from './Agent';


// agent list component that holds all the agent cards
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
                onAgentChatClick={props.onAgentChatClick}
            />   
        )}
</div>;


export default AgentList;