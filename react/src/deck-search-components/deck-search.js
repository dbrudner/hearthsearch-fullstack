import React from 'react'
import axios from 'axios'

export default class DeckSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            thing: ''
        }
    }

    componentDidMount() {
        axios.get('/api/decks')
        .then(function(response) {
            console.log(response)
        })
    }

    render() {
        return (
            <div>
                Deck DeckSear
            </div>
        )
    }
}