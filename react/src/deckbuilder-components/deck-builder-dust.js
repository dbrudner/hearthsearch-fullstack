import React from 'react'

export default function DeckDust(props) {

    // function deckCost(array) {
    //     console.log(array);
    //     array.reduce((a, card) => {
    //         console.log('card', card);
    //         if (card.rarity === 'Free') {
    //             return a + 0
    //         }

    //         if (card.rarity === 'Common') {
    //             return a + 40
    //         }
    //         if (card.rarity === 'Rare') {
    //             return a + 100
    //         }
    //         if (card.rarity === 'Epic') {
    //             return a + 400
    //         }
    //         if (card.rarity === 'Legendary') {
    //             console.log('leg')
    //         }

    //     }, 0)
    // }

    if (props.deck.length > 0) {
        const dust = props.deck.reduce((a, card) => {

            console.log('card', card);

            if (card.rarity === 'Free') {
                return a + 0
            }

            if (card.rarity === 'Common') {
                if (card.quantity === 2) {
                    return a + 80
                }
                return a + 40
            }

            if (card.rarity === 'Rare') {
                if (card.quantity === 2) {
                    return a + 200
                }
                return a + 100
            }

            if (card.rarity === 'Epic') {
                if (card.quantity === 2) {
                    return a + 800
                }
                return a + 400
            }

            if (card.rarity === 'Legendary') {
                return a  + 1600
            }

    }, 0)
    

        console.log('dust', dust);
        
        return (
            <div>
                <strong>Cost: </strong>{dust}
            </div>
        )
    } else {
        return (
            <div> </div>
        )
    }
    

    
}