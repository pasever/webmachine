import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';



class Login extends Component {

    

    render() {
      
  
      return (
        <div>
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Auth0 - React</a>
              </Navbar.Brand>
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, '/')}
              >
                Home
              </Button>
              
            </Navbar.Header>
          </Navbar>
        </div>
      );
    }
  }
  
  export default Login;