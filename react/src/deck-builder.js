import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios'
import _ from 'lodash'
import MediaQuery from 'react-responsive';

import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Searchbar from './searchbar'
import CardList from './card-components/card-list'
import Filters from './filter-components/filters'
import Banner from './banner'
import DeckBuilderList from './deckbuilder-components/deck-builder-list'
import WildOrStandard from './deckbuilder-components/wild-or-standard'

class App extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			isPaneOpen: false,
			filterOn: true,
			term: '',
			cards: [],
			card: '',
			update: true,
			format: this.props.format || null,
			deck: []
		}

	}

	componentWillReceiveProps(nextProps) {


		if (nextProps.card) {
            if (nextProps.card.name && nextProps.card.rarity) {
                var currentDeck = this.state.deck
                var newCard = nextProps.card
                newCard.quantity = 1;
    
                var incomingCard = [newCard]
    
                for (var i=0; i<currentDeck.length; i++) {
                    if (currentDeck[i].name === newCard.name && currentDeck[i].quantity < 2 && newCard.rarity !== 'Legendary') {
                        currentDeck[i].quantity = 2
                    }
                }
    
    
    
                var newDeck = currentDeck.concat(incomingCard) 
    
                var removedDuplicates = _.uniqBy(newDeck, 'name');
    
                this.setState(() => {
                    return {
                        deck: removedDuplicates,
                        dust: this.getDust(removedDuplicates),
                        curve: this.getManaCurve(removedDuplicates)
                    }
                })
            }
        }
	}

	getFilter = (filterName, filterValue) => {
		this.setState({
			[filterName]: filterValue
		})
	}

	getCard = card => {
		

		this.setState({card})

		let currentDeck = this.state.deck
		let newCard = card
		newCard.quantity = 1;

		let incomingCard = [newCard]

		for (let i=0; i<currentDeck.length; i++) {
			if (currentDeck[i].name === newCard.name && currentDeck[i].quantity < 2 && newCard.rarity !== 'Legendary') {
				currentDeck[i].quantity = 2
			}
		}



		let newDeck = currentDeck.concat(incomingCard) 

		let removedDuplicates = _.uniqBy(newDeck, 'name');

		this.setState(() => {
			return {
				deck: removedDuplicates
			}
		})

		
	}

	componentWillMount() {

		Modal.setAppElement('body');

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

	getFormat = format => {
		this.setState({format})
	}

	removeCard = toBeRemoved => {

		console.log(toBeRemoved)

		let newDeck = this.state.deck.map(card => {
            if (card.name !== toBeRemoved) {
                return card
            }

            if (card.name === toBeRemoved) {

                if (card.quantity === 2) {
                    let newCard = card
                    newCard.quantity = 1
                    return newCard
                }
            }
        })

        newDeck = newDeck.filter(item => {
            if (item) {return item}
        })

        this.setState({
            deck: newDeck
        })
	}

	render() {


		if (!this.state.format) {
			return (
				<WildOrStandard getFormat={this.getFormat}/>
			)
		}	

		return (
			<div>
				<div className='deck-builder-container'>
						<div className='row'>
							<div className='col-lg-2 col-md-2 col-xs-12'>
								{this.state.filterOn ? 
									<Filters imported={this.props.imported} deckBuilder={true} getFilter={this.getFilter}/> : <div />}
							</div>
							<div className='col-lg-10 col-md-10 col-xs-12'>
							<div className='search-bar-container'>
								<Searchbar onSearch={this.getFilter}/>
									<button onClick={() => this.setState({ isPaneOpen: true })}>Click me to open right pane!</button>
								
								<div>
									<SlidingPane
										isOpen={ this.state.isPaneOpen }
										width='300px'
										title='Your Deck'
										onRequestClose={ () => {
											// triggered on "<" on left top click or on outside click
											this.setState({ isPaneOpen: false });
									}}>
										<div className='deck-builder-list-container'> 
											<DeckBuilderList 
												format={this.props.format || this.state.format} 
												deck={this.state.deck} 
												hero={this.props.match ? this.props.match.params.class : this.state.hero} 
												card={this.state.card}
												removeCard={this.removeCard}
											/>
										</div>
									</SlidingPane>
								</div>
							</div>
								<CardList
									deck={this.state.deck}
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
						</div>
					</div>
				</div>
	);
	}
}

export default App