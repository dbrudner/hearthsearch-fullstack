import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    const removeCard = (event) => {
        props.removeCard(event.target.name)
    }

    return (
        <div className='tile-container'>
            <div>
                <div name={props.name} onClick={removeCard} className='deck-list-card-name animated fadeInRight'>
                {props.name} {(props.quantity === 2) ? (<span>x{props.quantity}</span>) : null}
                </div>
            <div className='card-tile center-block'>
                <div className='gray-box'>
                    <div className='card-list-mana'>{props.mana}</div>
                </div>
                <img name={props.name} alt={props.name} className='card-tile' src={source} /> 
            </div> 
            </div>
        </div>
    )
    
}