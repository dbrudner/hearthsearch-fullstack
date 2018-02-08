import React from 'react'
import CardImage from './card-image'
import CardInfo from './card-info'
import _ from 'lodash'

export default class CardList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			totalMatches: "",
			class: ''
		}

		this.getCard = this.getCard.bind(this);

	}

	componentDidMount() {
		this.setState(() => {
			this.state.class = this.props.class
		})		
	}

	getCard(card, cardObj) {
		this.props.getCard(card);
	}
	
	search(term, array, filters) {
		var matches = []
		var textMatches = []

		for (let i=0; i<array.length; i++) {
 
			if ((array[i].name.toLowerCase()).match(term.toLowerCase())) {
				matches.push(array[i])
				console.log(array[i].text)
				console.log(term)
			}

			if (array[i].text) {
				if (array[i].text.toLowerCase().match(term.toLowerCase())) {
					matches.push(array[i])
				}
			}

			

			// if ((array[i].text.match(term.toLowerCase()))) {
			// 	matches.push(array[i])
			// }

		}
		console.log(matches)

		if (filters.hero) {
			matches = matches.filter((card) => {
				return card.playerClass === filters.hero
			})
		}

		if (filters.type) {
			matches = matches.filter((card) => {
				return card.type === filters.type
			})
		}

		if (filters.rarity) {
			matches = matches.filter((card) => {
				return card.rarity === filters.rarity
			})
		}

		if (filters.cardSet) {
			matches = matches.filter((card) => {
				return card.cardSet === filters.cardSet;
			})
		}

		if (filters.mana) {

			if (filters.mana === ">10") {
				matches = matches.filter((card) => {
					return card.cost > 10;
				})
			}


			matches = matches.filter((card) => {
				return card.cost === parseInt(filters.mana, 10);
			})
		}

		if (filters.attack) {

			if (filters.attack === ">10") {
				matches = matches.filter((card) => {
					return card.attack > 10;
				})
			}
			matches = matches.filter((card) => {
				return card.attack === parseInt(filters.attack, 10);
			})
		}

		if (filters.health) {

			if (filters.health === ">10") {
				matches = matches.filter((card) => {
					return card.health > 10;
				})
			}

			matches = matches.filter((card) => {
				return card.health === parseInt(filters.health, 10);
			})
		}

		if (filters.minMana) {
			matches = matches.filter((card) => {
				return card.cost >= filters.minMana;
			})
		}

		if (filters.maxMana) {

			matches = matches.filter((card) => {
				return card.cost <= filters.maxMana;
			})
		}

		if (filters.minAttack) {
			matches = matches.filter((card) => {
				return card.attack >= filters.minAttack;
			})
		}

		if (filters.maxAttack) {
			matches = matches.filter((card) => {
				return card.attack <= filters.maxAttack;
			})
		}

		if (filters.minMana) {
			matches = matches.filter((card) => {
				return card.cost <= filters.minMana;
			})
		}

		if (filters.gameFormat === "Standard") {
			matches = matches.filter((card) => {
				return card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods"
			})
		}

		if (filters.tribe) {
			matches = matches.filter(function(card) {
				return card.race === filters.tribe;
			})
		}


		var secondArray = []
		if (filters.ability) {
			for (let i=0; i<matches.length; i++) {

				if (matches[i].text) {
					let string = matches[i].text.toLowerCase();
					let textSearchTerm = filters.ability.toLowerCase()

					for (let j=0; j<string.length; j++) {
						let sliced = string.slice(j, (j+textSearchTerm.length))
						if (sliced === textSearchTerm) {
							secondArray.push(matches[i]);
						}
					}
				}
			}
			if (!filters.ability2) {
				return secondArray;
			}
			if (filters.ability2) {
				var thirdArray = []
				for (let i=0; i<secondArray.length; i++ ) {
					
					if (secondArray[i].text) {
						let string = secondArray[i].text.toLowerCase();
						let textSearchTerm = filters.ability2.toLowerCase();

						for (let j=0; j<string.length; j++) {
							let sliced = string.slice(j, (j+textSearchTerm.length))
							if (sliced === textSearchTerm) {
								thirdArray.push(secondArray[i])
							}
						}
					}
				}
				return thirdArray;
			}
		}

		if (filters.ability2 && !filters.ability) {
			for (let i=0; i<matches.length; i++) {

				if (matches[i].text) {
					let string = matches[i].text.toLowerCase();
					let textSearchTerm = filters.ability2.toLowerCase()

					for (let j=0; j<string.length; j++) {
						let sliced = string.slice(j, (j+textSearchTerm.length))
						if (sliced === textSearchTerm) {
							secondArray.push(matches[i]);
						}
					}
				}
			}
			return secondArray;
		}
		// console.log(matches);
		
		return matches.filter(card => {
			return card.collectible === true
		})
	}

	renderCardList(term, cards, filters) {
		
		var filterKeys = Object.keys(filters);
		var numberOfFilters = 0;

		Object.keys(filters).forEach(function(key) {
			if (filters[key]) {
				numberOfFilters++
			}
		})

		if (term.length > 2 || numberOfFilters > 2) {

			var matches = this.search(term, cards, filters);

			matches = matches.filter((card, index, self) => 
				index === self.findIndex((t) => (
					t.name === card.name
				))
			)


			if (this.state.class) {
				matches = matches.filter(card => {
					return card.playerClass === this.state.class ||
					card.playerClass === "Neutral"
				})
			}

			if (matches.length < 50) {
				return matches.map(card => {
					
					let boundGetCard = this.getCard.bind(this, card);
					
					return (
						<li className='list-group-item' key={card.name}>
							<div className='row'>
								<CardImage image={card.img} artist={card.artist}/>
								<CardInfo 
									flavor={card.flavor}
									attack={card.attack}
									health={card.health}
									cardId={card.cardId}
									dbfId={card.dbfId}
									name={card.name}
									cost={card.cost}
									type={card.type}
									text={card.text}
									rarity={card.rarity}
									howToGet={card.howToGet}
									howToGetGold={card.howToGetGold}
									class={card.playerClass}
									cardSet={card.cardSet}
									getCard={this.getCard}
								/>
								
							</div>
						</li>
					)
				})
			}
						
		}

		return (
			<div>
				
			</div>
		)
	}

	
 	
	render() {
		if (this.props.cards) {
			var allCards = []

			Object.keys(this.props.cards).forEach((key) => {
				allCards = allCards.concat(this.props.cards[key])
			})

			// console.log(allCards);

			return (
					<div>
						<ul className='list-group cards'>
							{this.renderCardList(this.props.term, allCards, {
								hero: this.props.hero,
								type: this.props.type,
								rarity: this.props.rarity,
								cardSet: this.props.cardSet,
								mana: this.props.mana,
								attack: this.props.attack,
								health: this.props.health,
								minMana: this.props.minMana,
								maxMana: this.props.maxMana,
								minAttack: this.props.minAttack,
								maxAttack: this.props.maxAttack,
								minHealth: this.props.minHealth,
								maxHealth: this.props.maxHealth,
								gameFormat: this.props.gameFormat,
								ability: this.props.ability,
								ability2: this.props.ability2,
								tribe: this.props.tribe
							}

							)}
						</ul>
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