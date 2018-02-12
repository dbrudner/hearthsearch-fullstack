import React, {Component} from 'react'
import Nav from './nav-components/nav'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            redirectTo: null
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


        console.log(email)
        console.log(password)

        axios.post('/login', {
            email, password
          })
          .then((response) => {
            console.log(response);
            // this.setState({
            //     redirectTo: '/'
            // })
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <Nav />
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-title'>Log In</div>
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
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>   
            )
        }

        
    }
}