import React from 'react'
import CardImage from './card-image'
import CardInfo from './card-info'

export default class CardList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			totalMatches: "",
			matches: [],
			term: ''
		}


	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.term) {
			console.log(nextProps.term)

			this.setState({
				term: nextProps.term
			}, () => {
				this.search()				
			})
		}
	}

	getCard = (card, cardObj) => {
		this.props.getCard(card);
	}
	
	search = () => {
		console.log('hi?')
		console.log(this.state.term)

		const nameMatches = this.props.cards.filter(item => {
			return item.name.toLowerCase().match(this.state.term.toLowerCase())
		})

		const textMatches = this.props.cards.filter(item => {
			if (item.text) {
				return item.text.toLowerCase().match(this.state.term.toLowerCase())				
			} else {
				return false				
			}
		})

		let matches = [...nameMatches, ...textMatches]
		console.log('48', matches)

		if (!this.props.hero) {
			if (this.props.hero) {
				matches = matches.filter((card) => {
					return card.playerClass === this.props.hero
				})
			}
		}

		if (this.props.type) {
			matches = matches.filter((card) => {
				return card.type === this.props.type
			})
		}

		if (this.props.rarity) {
			matches = matches.filter((card) => {
				return card.rarity === this.props.rarity
			})
		}

		if (this.props.cardSet) {
			matches = matches.filter((card) => {
				return card.cardSet === this.props.cardSet;
			})
		}

		if (this.props.mana) {

			if (this.props.mana === ">10") {
				matches = matches.filter((card) => {
					return card.cost > 10;
				})
			}


			matches = matches.filter((card) => {
				return card.cost === parseInt(this.props.mana, 10);
			})
		}

		if (this.props.attack) {

			if (this.props.attack === ">10") {
				matches = matches.filter((card) => {
					return card.attack > 10;
				})
			}
			matches = matches.filter((card) => {
				return card.attack === parseInt(this.props.attack, 10);
			})
		}

		if (this.props.health) {

			if (this.props.health === ">10") {
				matches = matches.filter((card) => {
					return card.health > 10;
				})
			}

			matches = matches.filter((card) => {
				return card.health === parseInt(this.props.health, 10);
			})
		}

		if (this.props.minMana) {
			matches = matches.filter((card) => {
				return card.cost >= this.props.minMana;
			})
		}

		if (this.props.maxMana) {

			matches = matches.filter((card) => {
				return card.cost <= this.props.maxMana;
			})
		}

		if (this.props.minAttack) {
			matches = matches.filter((card) => {
				return card.attack >= this.props.minAttack;
			})
		}

		if (this.props.maxAttack) {
			matches = matches.filter((card) => {
				return card.attack <= this.props.maxAttack;
			})
		}

		if (this.props.minMana) {
			matches = matches.filter((card) => {
				return card.cost <= this.props.minMana;
			})
		}

		if (this.props.gameFormat === "Standard") {
			matches = matches.filter((card) => {
				return card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods"
			})
		}

		if (this.props.tribe) {
			matches = matches.filter(function(card) {
				return card.race === this.props.tribe;
			})
		}

		console.log('check?', matches)

		this.setState({
			matches: matches.filter(card => {
				return card.collectible === true
			})
		})

	}

	renderCardList = () => {

		if (this.props.cards && this.state.term) {
			

			console.log(this.state.matches);

			if (this.props.buildMode && this.props.hero) {
				this.setState({
					matches: this.state.matches.filter(card => {
						return card.playerClass === this.props.hero ||
						card.playerClass === "Neutral"
					})
				})
					
					
					
			}

			if (!this.props.buildMode && this.props.hero) {
				
				this.setState({
					matches: this.state.matches.filter(card => {
						return card.playerClass === this.props.hero
					})
				})
			}


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