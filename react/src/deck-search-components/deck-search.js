import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Searchbar from '../searchbar'
import DeckSearchResults from './deck-search-results'

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
        console.log(this.state)
		this.setState({
			[filterName]: filterValue
        })
        this.renderSearchResults()
	}

    componentDidMount = () => {

        let card = '5a8b0009b2b11e2fb806f269'
        let hero = 'warlock'

        // axios.get('/api/mongoose/import/cards')
        // .then(response => {
        //     console.log(response.data)
        //     // this.setState({
        //     //     decks: response.data
        //     // })
        // })

        // axios.post('/api/card/update', {
        //     cardId: card,
        //     hero
        // })
        // .then(response => {
        //     console.log(response.data)
        //     // this.setState({
        //     //     decks: response.data
        //     // })
        // })

        // axios.get('/api/cards/collectible')
        // console.log(response)        
        // .then(response => {
        //     this.setState({
        //         cards: response.data
        //     })
        // })
    }

    renderSearchResults= () => {
        let decks = this.state.decks
        // if (this.state.hero) {
        //     decks = decks.filter(deck => {
        //         return deck.playerClass === this.state.hero
        //     })
        // }

        if (this.state.archetype) {
            decks = decks.filter(deck => {
                return deck.archetype === this.state.archetype
            })
        }

        if (this.state.sort) {
            decks = _.sortBy(decks, [this.state.sort],['asc'])
        }

        if (this.state.sortType === 'descending') {
            decks = _.sortBy(decks, ['cost'],['asc']).reverse()
        }


        this.setState({
            results: decks
        })

    }



    render() {
        const classes = ["None", "Neutral", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()
        const gameFormats = ["", "Standard", "Wild"]
        const tribe = ["", "Beast", "Demon", "Dragon", "Elemental", "Mech", "Murloc", "Pirate", "Totem"]


        let cards = this.state.cards.map(card => {
            if (card.name) {
                return (
                    <option value={card.name} key={card.cardId}> {card.name} </option>
                )
            }
        })

        let heroes = classes.map(hero => {
            return (
                <option value={hero} key={hero}> {hero} </option>                
            )
        })        

        cards = cards.slice(7, cards.length)

        let archetypes = this.state.decks.map(deck => {
            return deck.archetype
        })


        return (
            <div>
                <h3>Archetypes</h3>
                <div className="form-group">
                    <select className="form-control" id="heroes" onChange={(event) => this.getFilter('hero', event.target.value)}>
                        {heroes}
                    </select>
                </div>
                <div className="form-group" onChange={(event) => this.getFilter('archetype', event.target.value)}>
                    <select className="form-control" id="archetypes">
                        {cards}
                    </select>
                </div>
                <hr/>
                <h3>Sort by</h3>
                <div className="form-group">
                    <select className="form-control" id="sort" onChange={(event) => this.getFilter('sort', event.target.value)}>
                        <option value='curve'>Mana Curve</option>
                        <option value='cost'>Dust</option>
                        <option value='upvotes'>Upvotes</option>
                        <option value='date'>Date</option>                        
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" id="sortType" onChange={(event) => this.getFilter('sortType', event.target.value)}>
                        <option value='ascending'>Ascending</option>
                        <option value='descending'>Descending</option>
                    </select>
                </div>
                <button className='btn btn-primary'>Submit</button>
                <div>
                    {this.state.results ? <DeckSearchResults results={this.state.results} /> :  <div>asdfaf</div>}
                </div>
            </div>
        )
    }
}