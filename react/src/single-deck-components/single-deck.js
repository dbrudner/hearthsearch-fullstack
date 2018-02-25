import React from 'react'
import axios from 'axios'
import DeckList from './deck-list'

import {Grid, Row, Col} from 'react-bootstrap'

export default class SingleDeck extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            cards: [],
            string: '',
            deck: null
        }
    }

    componentDidMount() {
        axios.get(`/api/export/${this.props.match.params.deckId}`)
        .then(res => {
            this.setState({
                string: res.data
            })
        })

        axios.get(`/api/deck/${this.props.match.params.deckId}`)
        .then(res => {
            console.log(res.data.cards)

            this.setState({
                cards: res.data.cards,
                deck: res.data
            })
        })
    }


    render() {
        
        console.log(this.state.deck)

        if (this.state.cards.length > 0) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-lg-offset-2 col-lg-6'>
                            <div className='singledeck-ctr panel'>
                                <div className='deck-title'>
                                    {this.state.deck.name}
                                </div>
                                <div className='deck-list-src'>
                                    {this.state.deck.source === 'HearthPwn' ?
                                        <div>
                                            <strong>
                                                <a target='_blank' href={`https://www.hearthpwn.com/members/${this.state.deck.user}`}>{this.state.deck.user}</a>
                                            </strong> 
                                            <span> from </span>
                                            <a target='_blank' href={`https://www.hearthpwn.com/members/${this.state.deck.user}`}>
                                                <span className='hearthpwn'>{this.state.deck.source}</span>
                                            </a>
                                        </div>                                                                   
                                        : 
                                        <span className='hearthtato'> HearthTato</span>
                                    }
    
                                </div>
                                <div className='single-deck-basic-info'>

                                </div>
                                <hr/>
                                <div className='single-deck-body'>
                                    <div className='single-deck-description'>
                                    {this.state.deck.source === 'HearthPwn' ? <div> This Deck is from HearthPwn.com</div> : this.state.deck.description || "No description"}
                                    </div>
                                </div>
                                <div className='single-deck-comments'>
                                    <form>
                                        <div className='form-group'>
                                            <input type='textarea' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div className='decklist-cntr panel'>
                                <div className='decklistctr'>
                                    <DeckList deck={this.state.cards}/>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            ) 
        } 
        
        else {
            return (
                <div/>
            )
        }

        
    }
}