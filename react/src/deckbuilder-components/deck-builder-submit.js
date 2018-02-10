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
        let cards = this.props.cards;
        axios.post('/newdeck', {
            name: this.props.name,
            archetype: this.props.archetype,
            cost: this.props.cost,
            cards: this.props.cards,
            cost: 1200,
            user: this.props.userId
            })
            .then(response => {
                console.log('hi')
                this.setState({
                    redirectTo: '/profile'
                })
            }).catch(error => {
                console.log(error)
            });
    }
    
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: '/search' }} />
        } else {
            return (
                <button className='btn btn-primary' onClick={() => this.handleClick()}>Submit</button>
            )
        }
    }

        
}

    
