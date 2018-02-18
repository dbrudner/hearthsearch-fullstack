import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios'

import Searchbar from './searchbar'
import CardList from './card-components/card-list'
import Filters from './filter-components/filters'
import Banner from './banner'
import DeckBuilderList from './deckbuilder-components/deck-builder-list'

class App extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			filterOn: true,
			term: '',
			cards: [],
			card: '',
			update: true
		}

	}

	getFilter = (filterName, filterValue) => {
		this.setState({
			[filterName]: filterValue
		})
	}

	getCard = card => {
		
		this.setState({card})
	}

	componentWillMount() {

		axios.get('/api/cards/collectible')
		.then((data) => {
			this.setState({cards: data.data})
		}).catch(err => console.log(err))

		// axios({
		// 	method:'get',
		// 	url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
		// 	headers: {"X-Mashape-Key": "BhtFx5NH0bmshlnQj9CkNKDDWrrjp1gr6JXjsnJ81pEtaCDfHV"}
		// }).then(data => {

		// 	this.setState({cards: data.data});
		this.setState({
			hero: this.props.hero
		})

	}

	render() {

		return (
			<div>
				<div className='deck-builder-container'>
						<div className='row'>
							<div className='col-lg-2 col-md-2 col-xs-12'>
								{this.state.filterOn ? 
									<Filters deckBuilder={true} getFilter={this.getFilter}/> : <div />}
							</div>
							<div className='col-lg-8 col-md-8 col-xs-12'>
							<div className='search-bar-container'>
								<Searchbar onSearch={this.getFilter}/>
							</div>
								
								<CardList
									render={50}
									nameSort={this.state.nameSort}
									sortingMethod={this.state.sortingMethod}
									cards={this.state.cards} 
									term={this.state.term} 
									rarity={this.state.rarity}
									cardSet={this.state.cardSet}
									mana={this.state.mana}
									attack={this.state.attack}
									health={this.state.health}
									minMana={this.state.minMana}
									maxMana={this.state.maxMana}
									minHealth={this.state.minHealth}
									maxHealth={this.state.maxHealth}
									minAttack={this.state.minAttack}
									maxAttack={this.state.maxAttack}
									gameFormat={this.state.gameFormat}
									ability={this.state.ability}
									ability2={this.state.ability2}
									tribe={this.state.tribe}
									type={this.state.type}
									getCard = {this.getCard}
									hero={this.props.match ? this.props.match.params.class : this.state.hero}
									buildMode={true}        
								/>
							</div>
							<div className='col-lg-2 col-md-2 col-xs-12'>
								<div className='affix'>
									<DeckBuilderList deck={this.props.deck} hero={this.props.match ? this.props.match.params.class : this.state.hero} card={this.state.card}/>
								</div>
							</div>
						</div>
					</div>
				</div>
	);
	}
}

export default App