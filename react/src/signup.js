import React, {Component} from 'react'
import Nav from './nav-components/nav'
import axios from 'axios'

export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);                
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("HI")
        event.preventDefault();
        let username = this.state.username
        let email = this.state.email
        let password = this.state.password
        https://hearthsearchpost.herokuapp.com/profile/signup
        axios.post('/signup', {
            email, username, password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="jumbotron">
                    <div class='signup-container text-center'>
                        <h1 className="display-3">Sign up!</h1>
                        <p className="lead">I stole this shit from bootstrap.</p>
                        
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                Username:
                                <input name='username' type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                Email:
                                <input name='email' type="text" value={this.state.value} onChange={this.handleEmailChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                Password:
                                <input name='password' type="text" value={this.state.value} onChange={this.handlePasswordChange} />
                                </label>
                            </div>
                            <div>                            
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}