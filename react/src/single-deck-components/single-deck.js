import React from 'react'
import axios from 'axios'
import DeckList from './deck-list'

import {Grid, Row, Col} from 'react-bootstrap'

export default class SingleDeck extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            string: ''
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
                deck: res.data.cards
            })
        })
    }


    render() {
        

        if (this.state.deck.length > 0) {
            return (
                <div>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='deck-title'>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <DeckList deck={this.state.deck}/>
                        </div>                    
                    </div>
                </div>
            ) 
        } 
        
        else {
            <div>
            </div>
        }

        
    }
}