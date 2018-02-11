import React from 'react'
import axios from 'axios'

export default function SingleDeck() {
    // axios.get('/api/deck/5a7f9afcd4972210fc198fe5')
    // .then(function(response) {
    //     console.log(response.data)
    // })

    // axios.post('/newcomment', {
    //     user: 'test',
    //     comment: 'comment',
    //     deckId: '5a7f9afcd4972210fc198fe5'
    // })


    axios.post('/newcommentupvote', {
        commentId: "5a7fc184b6ab3e2590243f74"
    })

    return (
        <div>wow</div>
    )
}