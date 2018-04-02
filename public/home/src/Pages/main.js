import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Agents from './Agents'
import Blog from './Blog'
import Login from './Login'
import MarketPage from './Market'
import Pricing from './Pricing'
import Products from './Products'
import Registration from './Registration'
import Solution from './Solution'
import Auth from './Auth/Auth';
import History from './Auth/History';
import Callback from './Auth/Callback';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

// The Main component renders one of the the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = ({data}) => (
  <main>
    <Switch history={history}>
      <Route exact path="/" render={ () => <Home auth={ auth } data={ data } /> } />
      {/*<Route exact path="/callback" render={() => <Redirect to="/"/>}/>*/}
      <Route path='/about' component={About} auth={ auth }/>
      <Route path='/agents' component={Agents} auth={ auth }/>
      <Route path='/blog' component={Blog} auth={ auth }/>
      <Route path='/login' render={ (props) => <Login auth={ auth } {...props} /> } />
      <Route path='/market' render={ () => <MarketPage data={ data } auth={ auth } /> }  />
      <Route path='/pricing' component={Pricing} auth={ auth }/>
      <Route path='/products' component={Products} auth={ auth }/>
      <Route path='/registration' component={Registration} auth={ auth }/>
      <Route path='/solution' component={Solution} auth={ auth }/>
      <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} auth={ auth }/> 
          }}/>
    </Switch>
  </main>
)

export default Main


{/* 

  const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const Main = ({data}) => (
  <main>
    <Switch>
      <Router history={history}>
      <Route exact path="/" render={ () => <Home data={ data } auth={auth} {...props} /> } />
      /*<Route exact path="/callback" render={() => <Redirect to="/"/>}/> /*
      <Route path='/about' component={About}/>
      <Route path='/agents' component={Agents}/>
      <Route path='/blog' component={Blog}/>
      <Route path="/log" render={ () => <Log data={ data } auth={auth} {...props} /> } />
      <Route path='/market' render={ () => <Market data={ data } /> } />
      <Route path='/pricing' component={Pricing}/>
      <Route path='/products' component={Products}/>
      <Route path='/registration' component={Registration}/>
      <Route path='/solution' component={Solution}/>
      <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          </Router>
    </Switch>
  </main>
)

*/ }