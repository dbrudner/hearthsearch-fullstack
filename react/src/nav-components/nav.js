import React from 'react'
import axios from 'axios'

export default class Nav extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            email: ''
        }
    }

    componentWillMount() {
        axios.get('/test')
        .then((response) => {
            if (response.data) {
                this.setState(() => {
                    return {
                        isLoggedIn: true,
                        email: response.data.local.email
                    }
                })
               
            }
        })
    }

    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <nav class='navbar nav'>
                     <a class="navbar-brand" href="/">Brand</a>
                     <ul class='nav navbar-nav'>
                        <li><a href="/">Build</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href='/'>Test</a></li>
                     </ul>
                     <ul class='nav navbar-nav navbar-right'>
                        <li><a href="/profile">{this.state.email}</a></li>
                        <li><a href="/logout">Logout</a></li>                        
                     </ul>
                </nav>
            )
        } else {
            return (
                <nav class='navbar nav'>
                     <a class="navbar-brand" href="/">Brand</a>
                     <ul class='nav navbar-nav'>
                        <li><a href="/">Build</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href='/'>Test</a></li>                        
                     </ul>
                     <ul class='nav navbar-nav navbar-right'>
                        <li><a href="/login">Log in</a></li>
                        <li><a href="/signup">Sign up</a></li>                        
                     </ul>
                </nav>
            )
        }

        
    }
    // render() {
    //     return (
    //         <nav class='navbar nav'>
    //                           <a class="navbar-brand" href="/">Brand</a>
    //                        <ul class='nav navbar-nav'>
    //                             <li><a href="/">Build</a></li>
    //                         <li><a href="/search">Search</a></li>
    //                         {/* <li><a href="#">Link</a></li> */}
    //                       </ul>
    //                      </nav>
    //     )
    // }
    
}