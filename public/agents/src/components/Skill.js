import React from 'react';
import { Link } from 'react-router-dom';


// individual skill component
const Skill = props => 
    <div className="agents-container-card">
        <div className="card-content">
            <ul className="card-skill-ul">
                <li className="card-content-name">
                    <h5><i>Skill:</i> { props.skillname }</h5>
                </li>
                <li className="card-content-handle">
                    <h5><i>Type:</i> { props.skilltype }</h5> 
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