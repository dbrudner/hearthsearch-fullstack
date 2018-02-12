import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
// import Logout from './logout'

export default class Nav extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			email: '',
			fireRedirect: null,
			checkedLoggedin: false
		}
	}

	componentWillMount() {
		axios.get('/test')
		.then((response) => {

			this.setState({
				checkedLoggedin: true
			})

			console.log(this.state.checkedLoggedin);

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

	handleClick() {
		console.log("Hi?");
		axios.get('/profile/logout')
        .then(response => {
						console.log('hi')
            window.location.href='/'
				})

	}

	render() {

		if (!this.state.checkedLoggedin) {
			return (
				<nav>
					<div className="nav-wrapper">
						<a href="/home" className="brand-logo">HearthSearch</a>
					</div>
			  </nav>
			)
		}


		if (this.state.isLoggedIn === true) {
			return (
                <nav className='navbar nav'>
                     <a className="navbar-brand" href="/">Brand</a>
                     <ul className='nav navbar-nav'>
                        <li><a href="/build">Build</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href='/'>Test</a></li>
                     </ul>
                     <ul className='nav navbar-nav navbar-right'>
                        <li><a href="/profile">{this.state.email}</a></li>
                        <li><a href="/logout">Logout</a></li>                        
                     </ul>
                </nav>
            )
		} else {
			return (
                <nav className='navbar nav'>
                     <a className="navbar-brand" href="/">Brand</a>
                     <ul className='nav navbar-nav'>
                        <li><a href="/build">Build</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href='/'>Test</a></li>                        
                     </ul>
                     <ul className='nav navbar-nav navbar-right'>
                        <li><a href="/login">Log in</a></li>
                        <li><a href="/signup">Sign up</a></li>                        
                     </ul>
                </nav>
            )
		}   
	}    
}