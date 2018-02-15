import React from 'react'

export default function DeckCardsLeft(props) {

    const getQuantity = (deck) => {
        return deck.reduce((a, card) => {
            return card.quantity + a
        }, 0)
    }

    console.log(props.deck)

   const totalCards = getQuantity(props.deck)

    if (props.deck.length) {
        console.log("HI")
        return (
            <div>
                {totalCards}/30
            </div>
        )
    } else {
        return null
    }

    
}