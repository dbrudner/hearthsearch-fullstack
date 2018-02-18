import React from 'react'
import axios from 'axios'

export default function SingleDeck(props) {
    
    // axios.get(`/api/export/${props.match.params.deckId}`)
    // .then(function(response) {
    //     console.log(response)
    // })

    return (
        <div>${props.match.params.deckId}</div>
    )
}