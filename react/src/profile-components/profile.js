import React from 'react'
import axios from 'axios'

export default function(props) {

    axios.get('/test')
    .then(response => { 
        console.log(response.data._id)

        axios.get(`/api/user/decks/${response.data._id}`)
        .then(response => {
            console.log(response.data)
        })

    })

    return (
        <div>
            User Proafdsfile
        </div>
    )
}