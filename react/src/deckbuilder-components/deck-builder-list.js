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

            if (card.mana) {
                return card.mana + a
            }

            if (card.cost) {
                
                return card.cost + a
            }

        }, 0))/(deck.length)).toFixed(2)
    }

    getDust(array) {
        return array.reduce((a, card) => {

    
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
        
        if (nextProps.deck) {
            this.setState({
                deck: this.props.deck
            })
        }

        if (nextProps.hero) {
            this.setState({
                hero: this.props.hero
            })
        }

        if (nextProps.card) {
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
    }

    removeCard = toBeRemoved => {


        let newDeck = this.state.deck.map(card => {
            if (card.name !== toBeRemoved) {
                return card
            }

            if (card.name === toBeRemoved) {

                if (card.quantity === 2) {
                    let newCard = card
                    newCard.quantity = 1
                    return newCard
                }
            }
        })

        newDeck = newDeck.filter(item => {
            if (item) {return item}
        })

        this.setState({
            deck: newDeck
        })

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

        const getQuantity = (deck) => {
            return deck.reduce((a, card) => {
                return card.quantity + a
            }, 0)
        }

        const totalCards = getQuantity(this.state.deck)

        let sorted = _.orderBy(this.state.deck, 'mana', 'asc')

        const cardDeck = sorted.map(card => {
            return (
                <DeckCardName removeCard={this.removeCard} mana={card.mana || card.cost} quantity={card.quantity} dbfId={card.dbfId} name={card.name} rarity={card.rarity} cardId={card.cardId}/>
            )
        })

 
        if (totalCards > 0) {
            return (
                <div className='deck-list-container'>
                    <div className='yr-deck-hdr'>
                        <div className='yr-deck'>
                            Your Deck
                        </div>
                            <DeckCardsLeft deck={this.state.deck} />                        
                        <div>
                            {
                                totalCards === 3 ? 
                                <Submit format={this.props.format} hero={this.props.hero} userId={this.state.userId} deck={this.state.deck} name='name' archetype='archetype' cost={1200} /> 
                                : 
                                    <button disabled className='btn next-page-btn-fail hvr-fade animated fadeIn'><span className='submit-btn-text'>Deck Must Have 30 Cards</span></button>
                            }                        
                        </div>
                    </div>
                    <hr/>
                    <div className='mana-chart-container'>
                        <DeckManaChart deck={this.state.deck} curve={this.state.curve}/>
                    </div>
                        <DeckDust dust={this.state.dust} />
                    <div>
                        {cardDeck}
                    </div>
                </div>
            )
        } else {
            return <div/>
        }
        
    }
}