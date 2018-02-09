import React from 'react'
import {
    BrowserRouter as Router,
    Route, 
    Link
} from 'react-router-dom'

import Home from './home'
import DeckBuilder from './deck-builder'
import ChooseClass from'./choose-class'
import Signup from './signup'
import Profile from './profile'
import Login from './login'
import Logout from './logout'


const App = () => {
    return (
        
        <Router>
            <div>
                <Route exact path='/' component={ChooseClass} />
                <Route exact path='/search' component={Home} />
                <Route exact path='/build/:class' component={DeckBuilder} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />                
            </div>
        </Router>
    )
}

export default App;