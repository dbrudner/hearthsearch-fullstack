import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios'
// import HearthstoneJSON from "hearthstonejson";

import Searchbar from './searchbar'
import CardList from './card-components/card-list'
import Filters from './filter-components/filters'
import Banner from './banner'

class Home extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			filterOn: true,
			term: ''
		}

	}

	getFilter = (filterName, filterValue) => {
		this.setState({
			[filterName]: filterValue
		})
	}

	componentWillMount() {

		axios.get('/api/cards/collectible')
		.then((data) => {
			console.log(data)
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
			<div className='deck-builder-container'>
		
				<div className='row'>
					<div className='col-xs-12 col-md-3 col-lg-2 col-xs-12'>
						{this.state.filterOn ? 
							<Filters getFilter={this.getFilter}/> : <div />}
					</div>
					<div className=' col-xl-12 col-lg-10 col-md-9 col-xs-12 search-bar-padding'>
						<div className='search-bar-container'>
							<Searchbar onSearch={this.getFilter}/>
						</div>
						<CardList 
							cards={this.state.cards} 
							term={this.state.term} 
							hero={this.state.hero}
							type={this.state.type}
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
							buildMode={false}          
						/>
					</div>
				</div>
			</div>
		</div>
	);
	}
}

export default Home