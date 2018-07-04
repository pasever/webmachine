import React from 'react';
import { Link } from 'react-router-dom';


// individual skill component
const Skill = props => 
    <div className="agents-container-card">
        <div className="card-content">
            <ul className="card-skill-ul">
                <li className="card-content-name">
                        <h4> Skill: </h4>
                    <h5> { props.skillname } </h5>
                </li>
                <li className="card-content-handle">
                        <h4> Type: </h4>
                   <h5> { props.skilltype } </h5>
                </li>
                <li className="card-content-skills card-skill-link">
                    <Link to={`/agents`} >           
                        Test
                    </Link>
                </li>
            </ul>
        </div>
    </div>;


export default Skill;