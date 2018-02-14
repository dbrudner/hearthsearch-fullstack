import React from 'react'
import axios from 'axios'

export default function SingleDeck(props) {
    axios.get(`/api/deck/${props.match.params.deckId}`)
    .then(function(response) {
        console.log(response.data)
    })

    return (
        <div>wow</div>
    )
}