import React from 'react'
import axios from 'axios'

export default function Profile() {

    axios.get('/test')
        .then(function(response) {
            console.log(response.data)
        })

    return (
        <div>
            Profile Page
        </div>
    )
}