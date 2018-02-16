import React from 'react'

export default function DeckCardsLeft(props) {

    const getQuantity = (deck) => {
        return deck.reduce((a, card) => {
            return card.quantity + a
        }, 0)
    }


   const totalCards = getQuantity(props.deck)

    if (props.deck.length) {
        return (
            <div>
                {totalCards}/30
            </div>
        )
    } else {
        return null
    }

    
}