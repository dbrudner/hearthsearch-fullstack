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
        const cards = this.props.cards.map(({_id, quantity}) => {
            return {
                _id, quantity
            }
        })

    
        axios.post('/newdeck', {
            name: this.props.name,
            archetype: this.props.archetype,
            cost: this.props.cost,
            cards,
            user: this.props.userId,
            hero: this.props.hero
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

    
