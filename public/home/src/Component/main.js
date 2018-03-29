import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Jumbotron from './Jumbotron'
import Market from './Market'
import About from './About'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = ({data}) => (
  <main>
    <Switch>
      <Route exact path="/" render={ () => <Jumbotron data={ data.main } /> } />
      <Route path="/market/workitems" render={ () => <Market data={ data.market } /> } />
      <Route path='/about' component={About}/>
    </Switch>
  </main>
)

export default Main