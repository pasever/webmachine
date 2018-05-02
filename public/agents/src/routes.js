  /////////////////////////////////////
 ////////    Agents Routes    ////////
/////////////////////////////////////

import React from 'react';
import { BrowserRouter, 
         Route, 
         Switch 
        } from 'react-router-dom';
import AgentsPage from './components/AgentsPage';
import AgentsSkillsPage from './components/AgentsSkillsPage';

const state = {
    name: ''
}

// set the state name with the name from the agent component 
const onAgentClick = (e) => {
    state.name = e.target.name;
}

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/agents' render={ () => <AgentsPage onAgentClick={ onAgentClick }/> }/>
            <Route path='/agents/:name' render={ () => <AgentsSkillsPage name={state.name}/>} />
        </Switch>
    </BrowserRouter>
);

export default routes;
