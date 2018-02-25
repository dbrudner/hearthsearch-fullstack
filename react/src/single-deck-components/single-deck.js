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
            deck: null,
            username: null,
            comment: '',
            id: ''
        }
    }

    handleChange = comment => {
        this.setState({
            comment
        })
    }

    handleSubmit = event => {

        const data = {
            userId: this.state.id,
            comment: this.state.comment,
            deckId: this.props.match.params.deckId,
        }

        axios.post('/newdeckcomment', data)
        .then(res => console.log(res))
    }

    componentDidMount() {

        console.log(`/api/deck/comments/${this.props.match.params.deckId}`)

        axios.get(`/api/deck/comments/${this.props.match.params.deckId}`)
        .then(res => console.log(res))

        axios.get(`/api/export/${this.props.match.params.deckId}`)
        .then(res => {
            this.setState({
                string: res.data
            })
        })

        axios.get(`/api/deck/${this.props.match.params.deckId}`)
        .then(res => {

            this.setState({
                cards: res.data.cards,
                deck: res.data
            })
        })

        axios.get('/test')
        .then(res => {
            console.log('user', res.data)

            if (res.data.local) {
                this.setState({
                    username: res.data.local.email,
                    id: res.data._id
                })
            }

            
        })
    }


    render() {
        
        console.log(this.state.username)

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
                                {this.state.username ? 
                                    <div className='single-deck-comments'>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className='form-group'>
                                                <textarea onChange={event => {this.handleChange(event.target.value)}} class='form-control comment-textarea' rows='4'></textarea>
                                                <button className='btn submit-btn'>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    <div>
                                        Login to post comments
                                    </div>
                                }
                                
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