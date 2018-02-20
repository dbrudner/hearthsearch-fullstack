import React from 'react'

export default function CardQuantity(props) {

    let quantity = props.deck.map(card => {
        if (card.name === props.name) {
            return card.quantity
        }
    })

    quantity = quantity[0]

    console.log(quantity)

    return (
        <div>{quantity}</div>
    ) 
}