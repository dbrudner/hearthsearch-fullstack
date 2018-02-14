import React from 'react'
import axios from 'axios'

export default function SingleDeck(props) {
    
    axios.get(`/api/deck/${props.match.params.deckId}`)
    .then(function(response) {

        let deckString = response.cards.map(card => {
            return [card.dbfId, card.cardQuantity]
        })

    })

    return (
        <div>wow</div>
    )
}