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
                         <h4> Handle: </h4>
                     <h5> { props.handle } </h5>
                </li>
                <li className="card-content-handler">
                        <h4> Handler: </h4>
                   <h5> { props.handler } </h5>
                </li>
                <li className="card-content-id">
                        <h4> ID: </h4>
                    <h5> { props.id } </h5>
                </li>
                <li className="card-content-skill">
                         <h4> Skills: </h4>
                    <h5> { props.skills.length } </h5>
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