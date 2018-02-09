import React from 'react'
import axios from 'axios'
import Signup from './signup'
import Home from './home'

export default class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {isLoggedIn: false}
    
    }

    componentWillMount() {
        axios.get('/test')
        .then((response) => {
            if (response.data) {
                console.log("Logged In")
                this.setState(() => {
                    return {isLoggedIn: true}
                })
                console.log(this.state.isLoggedIn)
            }
        })
    }
    

    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <div>
                    <Home />
                </div>
            )
        } else {
            return (
                <div>
                    <Signup />
                </div>
            )
        }
    }
}