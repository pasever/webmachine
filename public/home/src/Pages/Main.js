import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Agents from './Agents'
import Blog from './Blog'
import MarketPage from '../../../market/src/App';
import Pricing from './Pricing'
import Products from './Products'
import Register from './Registration'
import Solution from './Solution'
import Auth from './Auth/Auth';
import History from './Auth/History';
import Callback from './Auth/Callback';

const auth = new Auth();


const Main = ({data, history, profile}) => (
  <main>
      <Switch>
        <Route exact path="/" render={ (props) => { return <Home auth={ auth } data={ data } {...props} profile={ profile }  /> }} />
        <Route path='/about' component={About} auth={ auth }/>
        <Route path='/agents' component={Agents} auth={ auth }/>
        <Route path='/blog' component={Blog} auth={ auth }/>
        <Route path='/market' render={ (props) => <MarketPage data={ data } auth={ auth } {...props} /> }  />
        <Route path='/pricing' component={Pricing} auth={ auth }/>
        <Route path='/products' component={Products} auth={ auth }/>
        <Route path='/registration' render={ (props) => <Login auth={ auth } {...props} /> } />
        <Route path='/solution' component={Solution} auth={ auth }/>
      </Switch>
      
  </main>
)

export default Main
