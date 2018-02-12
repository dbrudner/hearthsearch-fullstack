import React, {Component} from 'react'
import Nav from './nav-components/nav'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'


export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            redirectTo: null,
            loginError: false
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);                
        this.handleLogin = this.handleLogin.bind(this);
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleUsernameChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleLogin(event) {
        console.log("HI")
        event.preventDefault();
        let email = this.state.email
        let password = this.state.password

        this.setState({
            loginError: 'loading'
        })

        setTimeout(() => {
            this.setState({
                loginError: 'error'
            })
        }, 2000)

        console.log(email)
        console.log(password)

        axios.post('/login', {
            email, password
          })
            .then((res) => {
                window.location.href='/'
            })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    render() {

        const loading =  () => {
            return (
            <div>
                Loading
            </div>
            )
        }
            
        

        return (
            <div>
                <Nav />
                <div className='card'>
                    <div className='card-content'>
                        {this.state.loginError === 'error' ? <div>Login Error</div> : <div/>}
                        {this.state.loginError === 'loading' ? 
                            <div>Loading</div>
                            :
                            <div/>
                        }                        
                            <form onSubmit={this.handleLogin}>
                            <div className='input-field'>
                                <input name='username' type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                                <label for='username'>Username</label>
                            </div>
                            <div className='input-field'>
                                <input name='password' type="text" value={this.state.value} onChange={this.handlePasswordChange} />
                                <label for='password'>Password</label>
                            </div>
                            <div>
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>   
        )
    }
}