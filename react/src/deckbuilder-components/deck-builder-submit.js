import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom';

export default class Submit extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            redirectTo: null
        }
    }

    handleClick() {

        console.log('quantity?', this.props.deck)

        const deck = this.props.deck.map(({_id, quantity}) => {
            return {
                _id, 
                cardQuantity: quantity
            }
        })

        console.log(deck)

        axios.post('/newdeck', {
            name: this.props.name,
            archetype: this.props.archetype,
            cost: this.props.cost,
            cards: deck,
            user: this.props.userId,
            hero: this.props.hero,
            source: "HearthTato",
            format: this.props.format
            })
            .then(response => {
                this.setState({
                    redirectTo: '/deck/page2/' + this.props.hero + '/' + response.data._id
                })
            }).catch(error => {
                console.log(error)
            });
    } 
    
    render() {


        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <button className='btn next-page-btn-success hvr-fade animated fadeIn' onClick={() => this.handleClick()}><span className='submit-btn-text'>Next Page</span></button>
            )
        }
    }

        
}

    
