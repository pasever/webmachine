import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../Pages/Auth/History'


class Header extends Component {
  
//including functions from auth0 for login/logout button rendering
goTo(route) {
  this.props.history.replace(`/${route}`)
}

login() {
  this.props.auth.login();
}

logout() {
  this.props.auth.logout();
}

  render() {
    const { isAuthenticated } = this.props.auth;

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
              <li><Link to='/market'>Market</Link></li>
              {/*
              <button onclick="myFunction()" class="dropbtn">Dropdown</button>
              <div id="myDropdown" class="dropdown-content">
                <Link to='/marketitems'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
                <Link to='/marketmywork'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
                <Link to='/marketdocs'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
              </div>
              */}
              <li><Link to='/agents'>Agents</Link></li>
              <li><Link to='/pricing'>Pricing</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
            </div>
            <div className="nav right">      
            { !isAuthenticated() ? (
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

export default Header;
