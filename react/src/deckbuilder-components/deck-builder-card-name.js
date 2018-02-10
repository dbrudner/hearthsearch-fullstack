import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    console.log(props.cardId);

    if (props.rarity === 'Legendary') {
        return (
            <span className='deck-list-card-name legendary' draggable='true'>
            {props.name} {(props.quantity === 2) ? (<span>{props.quantity}</span>) : null}
                <img alt={props.name} className='card-tile' src={source} />                
            </span>
        )
    }

    if (props.rarity === 'Epic') {
        return (
            <span className='deck-list-card-name epic' draggable='true'>
            {props.name} {(props.quantity === 2) ? (<span>{props.quantity}</span>) : null}
            <img alt={props.name} className='card-tile' src={source} />
            </span>
        )
    }

    if (props.rarity ==='Rare') {
        return (
            <span className='deck-list-card-name rare' draggable='true'>
            {props.name} {(props.quantity === 2) ? (<span>{ props.quantity}</span>) : null}
                <img alt={props.name} className='card-tile' src={source} />    
            </span>
        )
    }

    return (
        <span className='deck-list-card-name' draggable='true'>
        {props.name} {(props.quantity === 2) ? (<span>{props.quantity}</span>) : null}
            <img alt={props.name} className='card-tile' src={source} />    
        </span>
    )
   
}