import React from 'react'
import axios from 'axios'

export default function(props) {

    axios.get(`/api/user/decks/${props.match.params.userId}`)
    .then(response => {
        console.log(response.data)
    })

    axios.get('/test')
    .then(response => {
        console.log(response.data)
    })

    return (
        <div>
            User Profile
        </div>
    )
}