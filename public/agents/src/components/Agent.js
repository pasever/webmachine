import React from 'react';
import { Link }   from 'react-router-dom';

// individual agent card component
const Agent = props => 
    <div className="agents-container-card">
        <div className="img-container">
            <img src={ props.avatar } alt=""  />
        </div>
        <div className="card-content">
            <ul>
                <li className="card-content-name">
                    <h5>{ props.name }</h5>
                </li>
                <li className="card-content-handle">
                    <h5><i>Handle:</i> { props.handle }</h5> 
                </li>
                <li className="card-content-handler">
                    <h5><i>Handler:</i> { props.handler }</h5> 
                </li>
                <li className="card-content-id">
                    <h5><i>ID:</i> { props.id }</h5> 
                </li>
                <li className="card-content-skill">
                    <h5><i>Skills:</i> { props.skills.length }</h5> 
                </li>
                <li className="card-content-skills">
                    <Link to={`/agents/${props.name}`} 
                        value={props} 
                        onClick = { props.onAgentClick }
                        name={ props.name }
                    >           
                        Show Skills
                    </Link>
                </li>
            </ul>
        </div>
    </div>;


export default Agent;