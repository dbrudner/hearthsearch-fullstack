import React from 'react'
import axios from 'axios'
import Nav from '../nav-components/nav'
import Searchbar from '../searchbar'

export default class DeckSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            term: '',
            decks: [],
            cards: []
        }
    }

    getFilter = (filterName, filterValue) => {
		this.setState({
			[filterName]: filterValue
		})
	}

    componentDidMount = () => {
        axios.get('/api/decks')
        .then(response => {
            this.setState({
                decks: response.data
            })
        })

        axios.get('/api/cards/collectible')
        .then(response => {
            this.setState({
                cards: response.data
            })
            console.log(this.state.cards)
        })
    }



    render() {

        let cards = this.state.cards.map(card => {
            if (card.name) {
                return (
                    <option value={card.name} key={card.cardId}> {card.name} </option>
                )
            }
        })

        cards = cards.slice(7, cards.length)

        let archetypes = this.state.decks.map(deck => {
            return deck.archetype
        })


        return (
            <div>
                <Nav/>
                <div className="form-group">
                    <label></label>
                    <select className="form-control" id="sel1">
                        {cards}
                    </select>
                </div>
            </div>
        )
    }
}