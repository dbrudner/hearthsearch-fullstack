import React from 'react'

export default function DeckCardsLeft(props) {

    if (props.deck.length) {
        return (
            <div>
                {0 + props.deck.length}/30
            </div>
        )
    } else {
        return null
    }

    
}