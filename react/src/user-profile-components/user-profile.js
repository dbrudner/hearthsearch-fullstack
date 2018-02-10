import React from 'react'
import axios from 'axios'

export default function(props) {
    axios.get('/api/user/decks/5a7ec75aa62f3a084844a2da')
    .then(response => {
        console.log(response.data)
    })

    return (
        <div>
            User Profile
        </div>
    )
}