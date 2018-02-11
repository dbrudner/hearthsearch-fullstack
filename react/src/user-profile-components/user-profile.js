import React from 'react'
import axios from 'axios'

export default function(props) {


    // "5a7f9afcd4972210fc198fe5"

    axios.post('/upvote/5a7f9afcd4972210fc198fe5')
    .then(response => {
        console.log('fk')
        console.log(response)
    })

    // axios.get('/test')
    // .then(response => { 
    //     console.log(response.data._id)

    //     axios.get(`/api/user/decks/${response.data._id}`)
    //     .then(response => {
    //         console.log(response.data)
    //     })

    // })

    return (
        <div>
            User Proafdsfile
        </div>
    )
}