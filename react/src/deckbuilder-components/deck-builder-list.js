import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'

import DeckCardName from './deck-builder-card-name'
import DeckManaChart from './deck-builder-mana-chart'
import DeckDust from './deck-builder-dust'
import DeckCardsLeft from './deck-builder-cards-left'
import Submit from './deck-builder-submit'
import DeckAverageMana from './deck-average-mana'

export default class Deck extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            userId: '',
            dust: 0
        }
    }

    getManaCurve(deck) {
        return ((deck.reduce((a, card) => {
            return card.mana + a
        }, 0))/(deck.length)).toFixed(2)
    }

    getDust(array) {
        return array.reduce((a, card) => {

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
            } else {
                return 0
            }
    
            }, 0)
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
                return {
                    deck: removedDuplicates,
                    dust: this.getDust(removedDuplicates),
                    curve: this.getManaCurve(removedDuplicates)
                }
            })
        }
    }

    componentDidMount() {
        axios.get('/test')
        .then((response) => {
            this.setState({
                userId: response.data._id
            })
        }) 
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
                <Submit userId={this.state.userId} cards={this.state.deck} name='name' archetype='archetype' cost={1200} />
                <DeckDust dust={this.state.dust} />
                <DeckCardsLeft deck={this.state.deck} />
                {this.state.deck.length > 0 ? <DeckAverageMana curve={this.state.curve} /> : null}
                <ul className='list-group deck-list'>
                    {cardDeck}
                </ul>
            </div>
        )
    }
}