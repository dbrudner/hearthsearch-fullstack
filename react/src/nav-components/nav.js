import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
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

	renderClasses = (array) => {
		return array.map(item => {
			return (
				<li><Link to={`/Build/${item}`}>{item}</Link></li>			
			)
		})
	}
	

	render() {

		const classes = ["", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()



		if (!this.state.checkedLoggedin) {
			return (
				<nav className='navbar nav'>
                     <a className="navbar-brand" href="/">Brand</a>
                     <ul className='nav navbar-nav'>
                        <li><Link to="/Search">Search</Link></li>
                        <li><Link to="/Decks">Decks</Link></li>
                     </ul>
                     <ul className='nav navbar-nav navbar-right'>                     
                     </ul>
                </nav>
			)
		}


		if (this.state.isLoggedIn === true) {
			return (
                <nav className='navbar nav'>
                     <a className="navbar-brand" href="/">Brand</a>
                     <ul className='nav navbar-nav'>
                        <li><Link to="/Search">Search</Link></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Build A Deck<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><Link to="/import">Import</Link></li>							
								{this.renderClasses(classes)}
							</ul>
						</li>
                     </ul>
                     <ul className='nav navbar-nav navbar-right'>
                        <li><Link to="/profile">{this.state.email}</Link></li>
                        <li><Link to="/Logout">Logout</Link></li>                        
                     </ul>
                </nav>
            )
		} else {
			return (
                <nav className='navbar nav'>
					 <Link className='navbar-brand' to="/">Brand</Link>
                     <ul className='nav navbar-nav'>
                        <li><Link to="/Search">Search</Link></li>
                        <li><Link to="/Decks">Decks</Link></li>                 
                     </ul>
                     <ul className='nav navbar-nav navbar-right'>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>                        
                     </ul>
                </nav>
            )
		}   
	}    
}