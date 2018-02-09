import axios from 'axios'
import React from 'react'

export default function Submit(props) {
    
    let cards = props.cards;

    function handleClick() {
        console.log('sending')
        axios.post('/newdeck', {
            name: props.name,
            archetype: props.archetype,
            cost: props.cost,
            cards: props.cards,
            cost: 1200
            })
            .then(response => {
                console.log('sent?')
            }) 
    }
    
    return (
        <button className='btn btn-primary' onClick={() => handleClick()}>Submit</button>
    )
        
}

    
