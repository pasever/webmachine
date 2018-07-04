import React, { Component } from 'react';
import { Link }   from 'react-router-dom';
import logo from './images/slack.png';
import twitter from './images/twitter.png';
import mail from './images/mail.png';
import sms from './images/sms.jpeg';



// individual agent card component
class Agent extends Component {
    constructor(props) {
        super(props);
    }

    onAgentChatClick(e) {
        e.preventDefault();
        this.props.onAgentChatClick(this.props);
    }

    render() {
        return (
            <div className="agents-container-card">
                <div className="img-container">
                    <img src={ this.props.avatar } alt=""  />
                </div>
                <div className="card-content">
                    <ul>
                        <li className="card-content-name">
                            <h5>{ this.props.name }</h5>
                        </li>
                        <li className="card-content-handle">
                                <h4> Handle: </h4>
                            <h5> { this.props.handle } </h5>
                        </li>
                        <li className="card-content-handler">
                                <h4> Handler: </h4>
                        <h5> { this.props.handler } </h5>
                        </li>
                        <li className="card-content-id">
                                <h4> ID: </h4>
                            <h5> { this.props.id } </h5>
                        </li>
                        <li className="card-content-skill">
                                <h4> Skills: </h4>
                            <h5> { this.props.skills.length } </h5>
                        </li>
                        <li className="card-content-skills">
                            <button>
                                <Link to={`/agents/${this.props.name}`} 
                                    value={this.props} 
                                    onClick = { this.props.onAgentClick }
                                    name={ this.props.name }
                                >           
                                    Show Skills
                                </Link>
                            </button>
                            <button
                                onClick={ this.onAgentChatClick.bind(this) }
                            >
                                Chat
                            </button>
                        </li>          
                        <li className="card-content-social">
                            <a href="https://slack.com/" className="slack" target="_blank"><img src={ logo } title="White flower" alt="" width="20px" /></a>
                            <a href="https://twitter.com/" className="twitter" target="_blank"><img src={ twitter } title="White flower" alt="" width="60px" /></a>
                            <a href="https://gmail.com" target="_blank"><img src={ mail } title="White flower" alt="" width="18px" /></a>
                            <a href="https://google.com" className="sms" target="_blank"><img src={ sms } title="White flower" alt="" width="24.5px" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Agent;