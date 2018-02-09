import React from 'react'
import axios from 'axios'

export default function Logout(props) {
    axios.get('/profile/logout')
        .then((response) => {
        console.log("HI")            
            console.log(response)
        })

    return (
        <div>
            You have logged out!
        </div>
    )
    
}