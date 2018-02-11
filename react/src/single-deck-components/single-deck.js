import React from 'react'
import axios from 'axios'

export default function SingleDeck() {
    // axios.get('/api/deck/5a7f9afcd4972210fc198fe5')
    // .then(function(response) {
    //     console.log(response.data)
    // })
    axios.post('/newcardcomment', {
        user: "user",
        comment: "comment",
        cardId: "GAME_004",
    })
    
    // axios.get('/api/decks')
    // .then(result => {console.log(result.data)})

    // axios.post('/newcommentupvote', {
    //     commentId: "5a7fc184b6ab3e2590243f74"
    // })

    return (
        <div>wow</div>
    )
}