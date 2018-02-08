import React, { Component } from 'react'
import _ from 'lodash'

import DeckCardName from './deck-builder-card-name'
import DeckHeader from './deck-builder-header'
import DeckManaChart from './deck-builder-mana-chart'
import DeckDust from './deck-builder-dust'
import DeckCardsLeft from './deck-builder-cards-left'

export default class Deck extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deck: []
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.card.name && nextProps.card.rarity) {
            var currentDeck = this.state.deck
            var newCard = nextProps.card
            newCard.quantity = 1;

            var incomingCard = [newCard]

            for (var i=0; i<currentDeck.length; i++) {
                if (currentDeck[i].name === newCard.name && currentDeck[i].quantity < 2 && newCard.rarity !== 'Legendary') {
                    currentDeck[i].quantity = 2
                }
            }



            var newDeck = currentDeck.concat(incomingCard) 

            var removedDuplicates = _.uniqBy(newDeck, 'name');

            this.setState(() => {
                return {deck: removedDuplicates}
            })

        }
    }

    

    render() {

        const cardDeck = this.state.deck.map(card => {
            return (
                <li className='list-group-item' key={card.name}>
                    <div className='deck-list-card-container'>
                        <span className='deck-list-mana text-center'>
                            {card.mana}
                        </span>
                        <span><DeckCardName quantity={card.quantity} dbfId={card.dbfId} name={card.name} rarity={card.rarity} cardId={card.cardId}/></span>
                    </div>
                    
                </li>
            )
        })

        return (
            <div>
                <DeckManaChart deck={this.state.deck} />
                <DeckDust deck={this.state.deck} />
                <DeckCardsLeft deck={this.state.deck} />
                <ul className='list-group deck-list'>
                    {cardDeck}
                </ul>
            </div>
        )
    }
}