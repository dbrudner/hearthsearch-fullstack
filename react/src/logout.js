import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            redirectTo: null
        }
    }

    componentWillMount() {
        axios.get('/profile/logout')
        .then((response) => {
        console.log("HI")            
            console.log(response)
        })

        this.setState(() => {
            return ({
                redirectTo: '/'
            })
        })
    }
    

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            <div />
        }
    }
   
}