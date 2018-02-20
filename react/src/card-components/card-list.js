import React from 'react'
import CardImage from './card-image'
import CardInfo from './card-info'
import CardPopularity from './card-popularity'

import _ from 'lodash'
import axios from 'axios'

export default class CardList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			totalMatches: "",
			matches: [],
			term: '',
			hero: this.props.hero,
			totalRendered: this.props.render,
			preventUpdate: false,
			decksInfo: null
		}

		this.search = this.search.bind(this);
	}

	componentWillReceiveProps(nextProps) {


		if (nextProps) {
			this.setState({
				term: nextProps.term,
				totalRendered: this.props.render,
				hero: nextProps.hero
				
			}, () => {
				this.search(nextProps)				
			})

			// this.setState({
			// }, () => {
			// 	this.search(nextProps)				
			// })
		}

	}

	componentDidMount() {

		axios.get('/api/decks/classes')
		.then(result => {

			const decks = result.data

			const parseDecks = (decks, hero) => {
				return decks.reduce((a, deck) => {
					if (deck.hero.toLowerCase() === hero) {
						return a + 1
					} else {
						return a
					}
				}, 0)
			}

			const wildDecks = decks.filter(deck => deck.format === 'wild')
			const standardDecks = decks.filter(deck => deck.format === 'standard')
			


			const decksInfo = {
				standard: {
					druid: parseDecks(standardDecks, 'druid'),
					hunter: parseDecks(standardDecks, 'hunter'),
					mage: parseDecks(standardDecks, 'mage'),
					paladin: parseDecks(standardDecks, 'paladin'),
					priest: parseDecks(standardDecks, 'priest'),
					rogue: parseDecks(standardDecks, 'rogue'),
					shaman: parseDecks(standardDecks, 'shaman'),
					warlock: parseDecks(standardDecks, 'warlock'),
					warrior: parseDecks(standardDecks, 'warrior')
				},

				wild: {
					druid: parseDecks(wildDecks, 'druid'),
					hunter: parseDecks(wildDecks, 'hunter'),
					mage: parseDecks(wildDecks, 'mage'),
					paladin: parseDecks(wildDecks, 'paladin'),
					priest: parseDecks(wildDecks, 'priest'),
					rogue: parseDecks(wildDecks, 'rogue'),
					shaman: parseDecks(wildDecks, 'shaman'),
					warlock: parseDecks(wildDecks, 'warlock'),
					warrior: parseDecks(wildDecks, 'warrior')
				}
			}

			this.setState({
				decksInfo
			})

		})

		if (this.props.cards) {
			this.search()
		}
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	  }


	getCard = (card, cardObj) => {
		this.setState({
			preventUpdate: true
		})
		this.props.getCard(card);
	}
	
	search = (filters) => {

		const thisProps = this.props

		const nameMatches = this.props.cards.filter(item => {
			return item.name.toLowerCase().match(this.state.term.toLowerCase())
		})

		const textMatches = thisProps.cards.filter(item => {
			if (item.text) {
				return item.text.toLowerCase().match(this.state.term.toLowerCase())				
			} else {
				return false				
			}
		})

		let matches = [...nameMatches, ...textMatches]

		if (thisProps.ability && thisProps.ability !== 'None') {
			matches = matches.filter(card => {
				if (card.text) {
					return card.text.toLowerCase().match(thisProps.ability.toLowerCase())													
				} else {
					false
				}
			})
		}

		if (thisProps.ability2 && thisProps.ability2 !== 'None') {
			matches = matches.filter(card => {
				if (card.text) {
					return card.text.toLowerCase().match(thisProps.ability2.toLowerCase())													
				} else {
					false
				}
			})
		}

		if (thisProps.type && thisProps.type !== 'None') {
			matches = matches.filter((card) => {
				return card.type === thisProps.type
			})
		}

		if (thisProps.rarity && thisProps.rarity !== 'None') {
			matches = matches.filter((card) => {
				return card.rarity === thisProps.rarity
			})
		}


		if (thisProps.cardSet && thisProps.cardSet !== 'None') {
			matches = matches.filter((card) => {
				return card.cardSet === thisProps.cardSet;
			})
		}

		if (thisProps.mana && thisProps.mana !== 'None') {

			if (thisProps.mana === ">10") {
				matches = matches.filter((card) => {
					return card.cost > 10;
				})
			}


			matches = matches.filter((card) => {
				return card.cost === parseInt(thisProps.mana, 10);
			})
		}

		if (thisProps.attack && thisProps.attack !== 'None') {

			if (thisProps.attack === ">10") {
				matches = matches.filter((card) => {
					return card.attack > 10;
				})
			}
			matches = matches.filter((card) => {
				return card.attack === parseInt(thisProps.attack, 10);
			})
		}

		if (thisProps.health && thisProps.health !== 'None') {

			if (thisProps.health === ">10") {
				matches = matches.filter((card) => {
					return card.health > 10;
				})
			}

			matches = matches.filter((card) => {
				return card.health === parseInt(thisProps.health, 10);
			})
		}

		if (thisProps.minMana && thisProps.minMana !== 'None') {
			matches = matches.filter((card) => {
				return card.cost >= thisProps.minMana;
			})
		}

		if (thisProps.maxMana && thisProps.maxMana !== 'None') {

			matches = matches.filter((card) => {
				return card.cost <= thisProps.maxMana;
			})
		}

		if (thisProps.minAttack && thisProps.minAttack !== 'None') {
			matches = matches.filter((card) => {
				return card.attack >= thisProps.minAttack;
			})
		}

		if (thisProps.maxAttack && thisProps.maxAttack !== 'None') {
			matches = matches.filter((card) => {
				return card.attack <= thisProps.maxAttack;
			})
		}

		if (thisProps.minHealth && thisProps.minHealth !== 'None') {
			matches = matches.filter((card) => {
				return card.health <= thisProps.minHealth;
			})
		}

		if (thisProps.minHealth && thisProps.minHealth !== 'None') {
			matches = matches.filter((card) => {
				return card.health <= thisProps.minHealth;
			})
		}
		

		if (thisProps.gameFormat === "Standard") {
			matches = matches.filter((card) => {
				return card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods"
			})
		}

		if (thisProps.tribe && thisProps.tribe !== 'None') {
			matches = matches.filter(function(card) {
				return card.race === thisProps.tribe;
			})
		}


		if (this.props.buildMode) {
			if (thisProps.hero && thisProps.hero !== 'None') {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero || card.playerClass === "Neutral";
				})
			}
		}

		if (!this.props.buildMode) {
			if (thisProps.hero && thisProps.hero !== 'None') {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero ;
				})
			}
		}

		if (this.props.nameSort === 'Mana') {
			matches = _.orderBy(matches, 'cost', 'asc')
			
		}

		if (this.props.nameSort === 'Mana' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'cost', 'desc')
			
		}

		if (this.props.nameSort === 'Name') {
			matches = _.orderBy(matches, 'name', 'asc')
			
		}

		if (this.props.nameSort === 'Name' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'name', 'desc')
		
		}

		if (this.props.nameSort === 'LightForge Score') {
			matches = matches.filter(card => {
				return card.lightForgeScore[0]
			})

			matches = _.orderBy(matches, card => {
				return card.lightForgeScore[0].Score;
			}, ['desc']);

		}

		if (this.props.nameSort === 'LightForge Score' && this.props.sortingMethod == 'Ascending') {


			matches = matches.filter(card => {
				return card.lightForgeScore[0]
			})

			matches = _.orderBy(matches, card => {
				return card.lightForgeScore[0].Score;
			}, ['asc']);

		
		}

		if (this.props.nameSort === 'Name' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'name', 'desc')
		}

		if (this.props.nameSort === "Overall Wild") {
			console.log(matches);
			// console.log(this.state.decksInfo)

			const totalWild = this.state.decksInfo.wild
			const totalStandard = this.state.decksInfo.standard			
			
			matches.sort((deckA, deckB) => {

				let totalWildDecks = 0
				let inclusionsWildDeckA = 0
				let inclusionsWildDeckB = 0
				
				let inclusionsRateDeckA;
				let inclusionsRateDeckB

				for (let key in totalWild) {
					totalWildDecks = totalWildDecks + totalWild[key]
					}

				if (deckA.playerClass === 'Neutral') {
					for (let key in deckA.inclusionsWild) {
						inclusionsWildDeckA = inclusionsWildDeckA + deckA.inclusionsWild[key]
					}
				} else {
					inclusionsWildDeckA = deckA.inclusionsWild[deckA.playerClass.toLowerCase()]
				}

				if (deckB.playerClass === 'Neutral') {
					for (let key in deckB.inclusionsWild) {
						inclusionsWildDeckB = inclusionsWildDeckB + deckB.inclusionsWild[key]
					}
				} else {
					inclusionsWildDeckB = deckB.inclusionsWild[deckB.playerClass.toLowerCase()]
					
				}
				
				inclusionsRateDeckA = inclusionsWildDeckA/totalWildDecks
				inclusionsRateDeckB = inclusionsWildDeckB/totalWildDecks					
				console.log(deckA.name, inclusionsRateDeckA)
				console.log(deckB.name, inclusionsRateDeckB)
				
				return inclusionsRateDeckB - inclusionsRateDeckA				

			})
		}

		matches = _.uniqBy(matches, function (e) {
			return e.name;
		  });

		this.setState({
			matches: matches.filter(card => {
				return card.collectible === true
			})
		})

	}

	renderCardList = (cards) => {
		

		if (this.props.buildMode) {
			return cards.map(card => {

				let quantity = this.props.deck.map(deckCard => {
					if (deckCard.dbfId === card.dbfId) {
						return deckCard.quantity
					}
				})


				return (
						<div key={card.dbfId} className='col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-container '>
							<div class='card-result'>
								<CardInfo
									key={card.dbfId}
									quantity={quantity[0]}
									deck={this.props.deck}									
									image={card.img}
									decksInfo={this.state.decksInfo} 
									inclusionsWild={card.inclusionsWild}
									inclusionsStandard={card.inclusionsStandard}
									artist={card.artist}
									flavor={card.flavor}
									attack={card.attack}
									health={card.health}
									cardId={card.cardId}
									dbfId={card.dbfId}
									lightForgeScore={card.lightForgeScore}
									name={card.name}
									cost={card.cost}
									type={card.type}
									text={card.text}
									rarity={card.rarity}
									howToGet={card.howToGet}
									howToGetGold={card.howToGetGold}
									class={card.playerClass}
									cardset={card.cardSet}
									getCard={this.getCard}
									buildMode={this.props.buildMode}
									_id={card._id}
								/>
							</div>
						</div>
				)
		
			}) 
		}

			else {
				return cards.map(card => {
					return (
							<div key={card.dbfId} className='col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-container '>
								<div className='card-result'>
									<CardInfo
										deck={this.props.deck}
										image={card.img} 
										artist={card.artist}
										inclusionsWild={card.inclusionsWild}
										inclusionsStandard={card.inclusionsStandard}
										decksInfo={this.state.decksInfo}
										flavor={card.flavor}
										attack={card.attack}
										health={card.health}
										cardId={card.cardId}
										dbfId={card.dbfId}
										lightForgeScore={card.lightForgeScore}
										name={card.name}
										cost={card.cost}
										type={card.type}
										text={card.text}
										rarity={card.rarity}
										howToGet={card.howToGet}
										howToGetGold={card.howToGetGold}
										class={card.playerClass}
										cardset={card.cardSet}
										getCard={this.getCard}
										buildMode={this.props.buildMode}
										_id={card._id}
									/>
								</div>
							</div>
					)
			
				}) 
			}

			
			
		}


	renderTen = () => {
		this.setState({
			totalRendered: this.state.totalRendered + this.props.render
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


		if (this.props.cards) {
			return (
					<div>
						<div className='list-group cards'>
							<div className='row'>
								{this.renderCardList(this.state.matches.slice(0, this.state.totalRendered))}
							</div>
						</div>
					</div>
				)
		}
		if (!this.props.cards) {
			return (
				<div>
					Loading
				</div>
			)
		}
	}
}