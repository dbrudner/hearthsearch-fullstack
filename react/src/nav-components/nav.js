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
				<nav>
					<div className="nav-wrapper">
						<a href="/home" className="brand-logo">HearthSearch</a>
						<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
						<ul className="right hide-on-med-and-down">
							<li><a href="/search">Card Search</a></li>
							<li><a href="/decks">Deck Search</a></li>
							<li><a href="/build">Build a Deck</a></li>
							<li><a onClick={this.handleClick} >Log Out</a></li>						
						</ul>
						<ul className="side-nav" id="mobile-demo">
							<li><a href="/search">Card Search</a></li>
							<li><a href="/decks">Deck Search</a></li>
							<li><a href="/build">Build a Deck</a></li>
							<li><a onClick={this.handleClick}>Log Out</a></li>
						</ul>
					</div>
			  </nav>
			)
		} else {
			return (
				<nav>
				<div className="nav-wrapper">
				  <a href="#!" className="brand-logo">HearthSearch</a>
				  <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
				  <ul className="right hide-on-med-and-down">
						<li><a href="/search">Card Search</a></li>
						<li><a href="/decks">Deck Search</a></li>
						<li><a href="/build">Build a Deck</a></li>
						<li><a href="/login">Log in</a></li>
						<li><a href="/signup">Sign up</a></li>
				  </ul>
				  <ul className="side-nav" id="mobile-demo">
						<li><a href="/search">Card Search</a></li>
						<li><a href="/decks">Deck Search</a></li>
						<li><a href="/build">Build a Deck</a></li>
						<li><a href="/login">Log in</a></li>
						<li><a href="/signup">Sign up</a></li>
				  </ul>
				</div>
			  </nav>
			)
		}   
	}    
}