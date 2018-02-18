import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    const removeCard = (event) => {
        console.log('removing')
        props.removeCard(event.target.name)
    }

    const handleClick = () => {
        console.log('event')
    }

    const mana = () => {

        if (props.mana === 0) {
           return <div className='card-list-mana'>{props.mana}</div>            
        }

        if (props.cost === 0) {
            return <div className='card-list-mana'>{props.cost}</div>                        
        }

        if (props.mana || props.cost) {
            return <div className='card-list-mana'>{props.mana || props.cost}</div>                                    
        }

        else {
            return null
        }

        
    }

    return (
        <div onClick={removeCard} className='tile-container'>
            <div>
                <div name={props.name} onClick={handleClick} className='deck-list-card-name animated fadeInRight'>
                {props.name} {(props.quantity === 2) ? (<span>x{props.quantity}</span>) : null}
                </div>
            <div className='card-tile center-block'>
                <div className='gray-box'>
                    {mana()}
                </div>
                <div className='tile-img-cntr'>
                    <img name={props.name} alt={`${props.quantity} ${props.name}`} className='card-tile' src={source} />
                </div>
            </div> 
            </div>
        </div>
    )
    
}