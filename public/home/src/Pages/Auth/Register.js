import React,{ Component } from "react";
import API from "../../../utils/API"

class Register extends Component {
    state = {
        email: "",
        password: "",
        isNetwork: false
    }

    updateFormField = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    submitForm = event => {
        event.preventDefault();
        API.clientSignUp(this.state).then(response => console.log("This is the good response", response)).catch(err => console.log("This is the bad response", err))
    }

    render(){
        return(
            <form id="signup" onSubmit={this.submitForm}>
                <fieldset>
                    <legend>Sign up</legend>
                    <p>
                        <input type="email" id="signup-email" placeholder="Email" onChange={this.updateFormField} name="email" value={this.state.email} required/>
                    </p>
                    <p>
                        <input type="password" id="signup-password" placeholder="Password" onChange={this.updateFormField} name="password" value={this.state.password}
                            required/>
                    </p>
                    <input type="submit" value="Sign up"/>
                </fieldset>
            </form>
        )
    }
}

export default Register;