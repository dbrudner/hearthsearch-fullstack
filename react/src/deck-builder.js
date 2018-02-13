import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios'
import _ from 'lodash'

import Searchbar from './searchbar'
import CardList from './card-components/card-list'
import Filters from './filter-components/filters'
import Banner from './banner'
import DeckBuilderList from './deckbuilder-components/deck-builder-list'
import Nav from './nav-components/nav'

class App extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			filterOn: true,
			term: '',
			cards: [],
			card: ''
		}

	}

	getFilter = (filterName, filterValue) => {
		console.log(filterName, filterValue)
		this.setState({
			[filterName]: filterValue
		})
	}

	getCard = card => {

		this.setState({card})
		console.log(this.state.card)
	}

	componentWillMount() {

		axios.get('/api/cards')
		.then((data) => {
			console.log(data.data)
			this.setState({cards: data.data})
		}).catch(err => console.log(err))

		// axios({
		// 	method:'get',
		// 	url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
		// 	headers: {"X-Mashape-Key": "BhtFx5NH0bmshlnQj9CkNKDDWrrjp1gr6JXjsnJ81pEtaCDfHV"}
		// }).then(data => {

		// 	this.setState({cards: data.data});
	}

	render() {

		return (
		<div>
			<Nav />
		<div className='deck-builder-container'>
			<Banner />
			<div>{this.props.match.params.class}</div>
			<div className='row'>
					<div className='col-lg-1 col-md-2 col-xs-12'>
					{this.state.filterOn ? 
						<Filters getFilter={this.getFilter}/> : <div />}
					</div>
				<div className='col-lg-10 col-md-9 col-xs-12'>
					<Searchbar onSearch={this.getFilter}/>
					
					<CardList 
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
						getCard = {this.getCard}
						hero={this.props.match.params.class}
						buildMode={true}        
					/>
				</div>
				<div className='col-lg-1 col-md-1 col-xs-12'>
					<div className=''>
						<DeckBuilderList card={this.state.card}/>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
	}
}

export default App