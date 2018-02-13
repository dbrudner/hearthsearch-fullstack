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
        console.log(this.props.userId)
        axios.post('/newdeck', {
            name: this.props.name,
            archetype: this.props.archetype,
            cost: this.props.cost,
            cards: this.props.cards,
            user: this.props.userId
            })
            .then(response => {
                this.setState({
                    redirectTo: '/deck/page2/' + response.data._id
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
                <button className='btn btn-primary' onClick={() => this.handleClick()}>Submit</button>
            )
        }
    }

        
}

    
