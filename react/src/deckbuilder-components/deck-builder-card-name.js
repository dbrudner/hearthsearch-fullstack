import React from 'react'

export default function DeckCardName(props) {

    var source = `https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png`

    const removeCard = (event) => {
        let cardName = props.name
        props.removeCard(cardName)
    }

    const mana = () => {


        if (props.mana === 0) {
           return <div className='card-list-mana'>{props.mana}</div>            
        }

        if (props.cost === 0) {
            return <div className='card-list-mana'>{props.cost}</div>                        
        }

        if (props.mana >= 10) {
            return <div className='card-list-mana-10'>{props.mana}</div>            
         }
 
         if (props.cost >= 10) {
             return <div className='card-list-mana-10'>{props.cost}</div>                        
         }

        if (props.mana) {
            return <div name={props.name} className='card-list-mana'>{props.mana}</div>                                    
        }

        if (props.cost) {
            return <div name={props.name} className='card-list-mana'>{props.cost}</div>                                    
        }

        else {
            return null
        }

        
    }

    return (
        <div name={props.card} onClick={removeCard} className='tile-container'>
            <div>
                <div  className='deck-list-card-name animated fadeInRight'>
                {props.name} {(props.quantity === 2) ? (<span>x{props.quantity}</span>) : null}
                </div>
            <div className='card-tile center-block' name={props.card}>
                <div className='gray-box' name={props.card} >
                    {mana()}
                </div>
                <div className='tile-img-cntr' name={props.card} >
                    <img name={props.name} alt={`${props.quantity} ${props.name}`} className='card-tile' src={source} />
                </div>
            </div> 
            </div>
        </div>
    )
    
}