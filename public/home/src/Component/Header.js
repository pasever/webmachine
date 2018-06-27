import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import history from '../Pages/Auth/History'




class Header extends Component {

  constructor(props) {
    super(props);
    let tokenExists = localStorage.getItem("access_token");
    this.state = {
      authenticated: tokenExists !== null,
    }
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }


  handleAuthentication = ({location, auth}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
      this.setState({ authenticated: true });
    }
  }
  componentDidMount() {
    this.handleAuthentication(this.props);
  }
  //including functions from auth0 for login/logout button rendering
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.setState({ authenticated: false });
  }


  render() {
    
    if(this.props.data){
        var name = this.props.data.name;
        var occupation = this.props.data.occupation;
        var description = this.props.data.description;
        var city = this.props.data.address.city;
        var networks = this.props.data.social.map(function(network){
          return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
        });
    }
    return (
      <div id="headerBackground">
      <header id="home">
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	       <a className="mobile-btn" href="" title="Hide navigation">Hide navigation</a>
         <ul id="nav" className="nav">
            <div className="nav left">
              <li className="current"><Link to='/'>Home</Link></li>
              <li><Link to='/products' >Products</Link></li>
              <li><Link to='/solution'>Solution</Link></li>
              <li><a href='/market'>Market</a></li>
              <li><a href='/agents'>Agents</a></li>
              <li><Link to='/pricing'>Pricing</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
            </div>
            <div className="nav right">  
            <script async defer src="https://slack.strategicmachines.com/slackin.js"></script> 
            <li><a href="https://slackin-wjhddkharc.now.sh/" target="blank">Chat</a></li>   
            { !this.state.authenticated ? (
                <li><a className="smoothscroll" id="signup" href="#" onClick={this.login.bind(this)}>Log In</a></li> ) :(                
                <div>
                  <span><strong>User: </strong></span>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><a className="smoothscroll" id="signup" href="#" onClick={this.logout.bind(this)}>Log Out</a></li>
                </div>
            )}
            </div>
         </ul>
      </nav>
      </header>      
    </div>
   
    );
  }
}

export default withRouter(Header);
