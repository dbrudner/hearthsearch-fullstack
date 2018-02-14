import React from 'react'
import CardImage from './card-image'
import CardInfo from './card-info'

export default class CardList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			totalMatches: "",
			matches: [],
			term: '',
			hero: this.props.hero
		}

		this.search = this.search.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps) {
			this.setState({
				term: nextProps.term
			}, () => {
				this.search(nextProps)				
			})

			this.setState({
				hero: nextProps.hero
			}, () => {
				this.search(nextProps)				
			})
		}

	}

	componentDidMount() {
		if (this.props.cards) {
			this.search()
		}
	}

	getCard = (card, cardObj) => {
		this.props.getCard(card);
	}
	
	search = (filters) => {

		console.log(this.props.hero)

		const thisProps = this.props

		console.log(thisProps)

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


		console.log(thisProps.hero)

		if (thisProps.type) {
			matches = matches.filter((card) => {
				return card.type === thisProps.type
			})
		}

		if (thisProps.rarity) {
			matches = matches.filter((card) => {
				return card.rarity === thisProps.rarity
			})
		}

		if (thisProps.cardSet) {
			matches = matches.filter((card) => {
				return card.cardSet === thisProps.cardSet;
			})
		}

		if (thisProps.mana) {

			if (thisProps.mana === ">10") {
				matches = matches.filter((card) => {
					return card.cost > 10;
				})
			}


			matches = matches.filter((card) => {
				return card.cost === parseInt(thisProps.mana, 10);
			})
		}

		if (thisProps.attack) {

			if (thisProps.attack === ">10") {
				matches = matches.filter((card) => {
					return card.attack > 10;
				})
			}
			matches = matches.filter((card) => {
				return card.attack === parseInt(thisProps.attack, 10);
			})
		}

		if (thisProps.health) {

			if (thisProps.health === ">10") {
				matches = matches.filter((card) => {
					return card.health > 10;
				})
			}

			matches = matches.filter((card) => {
				return card.health === parseInt(thisProps.health, 10);
			})
		}

		if (thisProps.minMana) {
			matches = matches.filter((card) => {
				return card.cost >= thisProps.minMana;
			})
		}

		if (thisProps.maxMana) {

			matches = matches.filter((card) => {
				return card.cost <= thisProps.maxMana;
			})
		}

		if (thisProps.minAttack) {
			matches = matches.filter((card) => {
				return card.attack >= thisProps.minAttack;
			})
		}

		if (thisProps.maxAttack) {
			matches = matches.filter((card) => {
				return card.attack <= thisProps.maxAttack;
			})
		}

		if (thisProps.minMana) {
			matches = matches.filter((card) => {
				return card.cost <= thisProps.minMana;
			})
		}

		if (thisProps.gameFormat === "Standard") {
			matches = matches.filter((card) => {
				return card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods"
			})
		}

		if (thisProps.tribe) {
			matches = matches.filter(function(card) {
				return card.race === thisProps.tribe;
			})
		}

		if (thisProps.hero) {
			console.log(thisProps)
			matches = matches.filter(function(card) {
				return card.playerClass === thisProps.hero;
			})
		}

	// 	if (!thisProps.buildMode && thisProps.hero) {
	// 		matches = this.state.matches.filter(card => {
	// 			return card.playerClass === thisProps.hero 
	// 		})	
	// }

	// 	if (thisProps.buildMode && thisProps.hero) {
	// 		matches = this.state.matches.filter(card => {
	// 			return card.playerClass === thisProps.hero ||
	// 			card.playerClass === "Neutral"
	// 		})			
	// 	}


		this.setState({
			matches: matches.filter(card => {
				return card.collectible === true
			})
		})

	}

	renderCardList = () => {

		if (this.state.matches.length < 10) {
			if (this.props.cards) {
	
					return this.state.matches.map(card => {
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
										buildMode={this.props.buildMode}
									/>
									
								</div>
							</li>
						)
					})
				return (
					<div>
						
					</div>
				)
			}
		}

		

			
	}
 	
	render() {
		if (this.props.cards) {
			
			return (
					<div>
						<ul className='list-group cards'>
							{this.renderCardList()}
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