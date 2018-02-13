import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Home from './home'
import DeckBuilder from './deck-builder'
import ChooseClass from'./choose-class'
import Signup from './signup'
import Profile from './profile'
import Login from './login'
import Logout from './logout'
import SingleDeck from './single-deck-components/single-deck'
import DeckSearch from './deck-search-components/deck-search'
import UserProfile from './user-profile-components/user-profile'

const App = () => {
    return (
        
        <Router>
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/search' component={Home} />
                <Route exact path='/build/:class' component={DeckBuilder} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/build' component={ChooseClass} />
                <Route exact path='/deck' component={SingleDeck} />
                <Route exact path='/decks' component={DeckSearch} />
                <Route exact path='/user/:userId' component={UserProfile} />                                                                                                                                    
            </div>
        </Router>
    )
}

export default App;