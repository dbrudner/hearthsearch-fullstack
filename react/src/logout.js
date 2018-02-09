import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default function Logout() {

    axios.get('/profile/logout')
        .then(response => {
            console.log(response)
        })

    return (
        <Redirect to={{ pathname: '/' }} />
    )
    
}