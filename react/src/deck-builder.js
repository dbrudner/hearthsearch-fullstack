import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios'
import _ from 'lodash'
import MediaQuery from 'react-responsive';
import Swipe from 'react-easy-swipe';

import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';


import Searchbar from './searchbar'
import CardList from './card-components/card-list'
import Filters from './filter-components/filters'
import Banner from './banner'
import DeckBuilderList from './deckbuilder-components/deck-builder-list'
import WildOrStandard from './deckbuilder-components/wild-or-standard'
import FiltersSlide from './filter-components/filters-slide'
import DeckInfoMobile from './deckbuilder-components/deck-info-mobile'
import {StickyContainer, Sticky } from 'react-sticky'


class App extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			isPaneOpen: false,
			isFilterPaneOpen: false,
			filterOn: true,
			term: '',
			cards: [],
			card: '',
			update: true,
			format: this.props.format || null,
			deck: []
		}

	}

	// onSwipeStart(event) {
	// 	console.log('Start swiping...', event);
	// }
	 
	onSwipeMove = (position, event) => {
		console.log(`Moved ${position.x} pixels horizontally`, event);
		console.log(`Moved ${position.y} pixels vertically`, event);

		if (position.x > 50) {
			this.setState({isFiltersPaneOpen: true})
		}

		if (position.x < -50) {
			console.log('filter open')
			this.setState({isPaneOpen: true})
		}
	}
	
	// onSwipeEnd(event) {
	// 	console.log('End swiping...', event);
	// }

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

	componentDidMount() {

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

	componentWillMount() {
		Modal.setAppElement('body');		

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
			<div className='deck-bldr-cntr'>
				<Swipe
					onSwipeStart={this.onSwipeStart}
					onSwipeMove={this.onSwipeMove}
					onSwipeEnd={this.onSwipeEnd}
				>
				<StickyContainer>
				<MediaQuery query='(max-device-width: 1024px)'>
				<div className='sticky-bar'>
				<Sticky>
				{
					({
					style,
		
					// the following are also available but unused in this example 
					isSticky,
					wasSticky,
					distanceFromTop=80,
					distanceFromBottom=80,
					calculatedHeight
					}) => {
					return (
						<div style={style} className='sticky-bar'>
							<DeckInfoMobile hero={this.props.match ? this.props.match.params.class : this.state.hero} deck={this.state.deck} format={this.props.format || this.state.format}/>
						</div>
					)
					}
				}
				</Sticky>
				</div>
				</MediaQuery>
			{/* </StickyContainer>
				<StickyContainer>
					<Sticky topOffset={5}>
						{
							() => <DeckInfoMobile hero={this.props.match ? this.props.match.params.class : this.state.hero} deck={this.state.deck} format={this.props.format || this.state.format}/>
						}
					</Sticky>						 */}
					<div className='deck-builder-container'>
							<div className='row'>
								<MediaQuery query='(min-device-width: 1400px)'>
									<div className='col-lg-2'>
										
										<Filters imported={this.props.imported} deckBuilder={true} getFilter={this.getFilter}/>
									</div>
								</MediaQuery>
								<SlidingPane
									isOpen={ this.state.isFiltersPaneOpen }
									width='300px'
									from ='left'
									onRequestClose={ () => {
										this.setState({ isFiltersPaneOpen: false });
									}}>
									<div>
										<FiltersSlide imported={this.props.imported} deckBuilder={true} getFilter={this.getFilter}/>
									</div>
								</SlidingPane>
								<MediaQuery query='(min-device-width: 1400px)'>							
									<div className='col-lg-10 col-md-10 col-xs-12'>
										<div className='search-bar-container'>
											<Searchbar onSearch={this.getFilter}/>
											<button onClick={() => this.setState({ isPaneOpen: true })}>Click me to open right pane!</button>
											<MediaQuery query='(max-device-width: 1400px)'>
												<button onClick={() => this.setState({ isFiltersPaneOpen: true })}>Click me tofilters pane!</button>
											</MediaQuery>
											<div>
												<SlidingPane
													isOpen={ this.state.isPaneOpen }
													width='300px'
													onRequestClose={ () => {
														this.setState({ isPaneOpen: false });
													}}>
													<div className='deck-builder-list-container'>
														<div className='filters-block'>
														</div>
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
								</MediaQuery>
								<MediaQuery query='(max-device-width: 1400px)'>							
										<div className='search-bar-container'>
												<Searchbar onSearch={this.getFilter}/>
												<div className='pane-btns-container'>										
													<button className='btn deck-btn' onClick={() => this.setState({ isPaneOpen: true })}>Deck</button>
													<MediaQuery query='(max-device-width: 1400px)'>
														<button className='btn filter-btn' onClick={() => this.setState({ isFiltersPaneOpen: true })}>Filters</button>
													</MediaQuery>
												</div>
											<div>
												<SlidingPane
													isOpen={ this.state.isPaneOpen }
													width='300px'
													onRequestClose={ () => {
														this.setState({ isPaneOpen: false });
													}}>
													<div className='deck-builder-list-container'>
														<div className='filters-block'>
														</div>
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
								</MediaQuery>
							</div>
						</div>
						</StickyContainer>
					</Swipe>
				</div>
	);
	}
}

export default App