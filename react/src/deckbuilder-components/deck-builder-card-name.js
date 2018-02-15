import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    const removeCard = (event) => {
        props.removeCard(event.target.name)
    }

    if (props.rarity === 'Legendary') {
        return (
            <div name={props.name} onClick={removeCard} className='deck-list-card-name legendary' draggable='true'>
                {props.name} {(props.quantity === 2) ? (<div>{props.quantity}</div>) : null}
                <img name={props.name} alt={props.name} className='card-tile' src={source} />                
            </div>
        )
    }

    if (props.rarity === 'Epic') {
        return (
            <div name={props.name} onClick={removeCard} className='deck-list-card-name epic' draggable='true'>
                <div className='position-absolute'>
                    {props.name} {(props.quantity === 2) ? (<div>{props.quantity}</div>) : null}
                </div>
                <img name={props.name} alt={props.name} className='card-tile position-absolute' src={source} />
            </div>
        )
    }

    if (props.rarity ==='Rare') {
        return (
            <div name={props.name} onClick={removeCard} className='deck-list-card-name rare'>
            {props.name} {(props.quantity === 2) ? (<div>{ props.quantity}</div>) : null}
                <img name={props.name} alt={props.name} className='card-tile' src={source} />    
            </div>
        )
    }

    return (
        <div name={props.name} onClick={removeCard} className='deck-list-card-name' draggable='true'>
        {props.name} {(props.quantity === 2) ? (<div>{props.quantity}</div>) : null}
            <img name={props.name} alt={props.name} className='card-tile' src={source} />    
        </div>
    )
   
}