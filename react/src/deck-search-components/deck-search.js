import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import Searchbar from '../searchbar'
import DeckSearchResults from './deck-search-results'
import DeckSearchBanner from './deck-search-banner'
import DeckSearchRow from './deck-search-row'

export default class DeckSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            term: '',
            decks: [],
            cards: [],
            matches: [],
            renderMatches: [],
            renderCount: 10
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
        axios.get('/api/decks/populate')
        .then(result => {
            console.log(result)
            this.setState({
                decks: result.data
            })
        }).then (() => {
            this.renderSearchResults()
        })

        window.addEventListener('scroll', this.onScroll, false);

    }

    componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
    }

    renderSearchResults= () => {
        console.log(this.state.renderCount)
        let decks = this.state.decks

        // if (this.state.hero) {
        //     decks = decks.filter(deck => {
        //         return deck.playerClass === this.state.hero
        //     })
        // }

        // if (this.state.archetype) {
        //     decks = decks.filter(deck => {
        //         return deck.archetype === this.state.archetype
        //     })
        // }

        // if (this.state.sort) {
        //     decks = _.sortBy(decks, [this.state.sort],['asc'])
        // }

        // if (this.state.sortType === 'descending') {
        //     decks = _.sortBy(decks, ['cost'],['asc']).reverse()
        // }


        this.setState({
            matches: decks
        })

        this.setState({
            renderMatches: this.state.matches.slice(0, this.state.renderCount)
        })

        console.log(this.state.renderCount)

        console.log(this.state.renderMatches)
    }

    renderTen = () => {
        this.setState({
            renderCount: this.state.renderCount + 10,
            renderMatches: this.state.matches.slice(0, this.state.renderMatches)
        })
    }

    onScroll = () => {
		if (
		  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
		) {
		  this.renderTen();
		}
	}



    render() {
        const classes = ["Neutral", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()
        const gameFormats = ["Standard", "Wild"]

        // Get dropdown of all cards
        let cardsDropdown = this.state.cards.map(card => {
            if (card.name) {
                return (
                    <option value={card.name} key={card.cardId}> {card.name} </option>
                )
            }
        })

        // Get dropdown of all heroes
        let heroes = classes.map(hero => {
            return (
                <option value={hero} key={hero}> {hero} </option>                
            )
        })        

        // Get dropdown of all archetypes
        let archetypes = this.state.decks.map(deck => {
            return deck.archetype
        })


        return (
            <div>
                <DeckSearchBanner decks={this.state.decks}/>
                <DeckSearchRow matches={this.state.renderMatches} getFilter={this.getFilter}/>
            </div>
        )
    }
}