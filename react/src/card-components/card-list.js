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
			hero: this.props.hero,
			totalRendered: 10
		}

		this.search = this.search.bind(this);
	}

	componentWillReceiveProps(nextProps) {


		if (nextProps) {
			this.setState({
				term: nextProps.term,
				totalRendered: 10
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
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	  }


	getCard = (card, cardObj) => {
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

		if (thisProps.type && thisProps.type !== 'None') {
			console.log("matching type")
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

		if (thisProps.minMana && thisProps.minMana !== 'None') {
			matches = matches.filter((card) => {
				return card.cost <= thisProps.minMana;
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
			if (thisProps.hero) {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero || card.playerClass === "Neutral";
				})
			}
		}

		if (!this.props.buildMode) {
			if (thisProps.hero) {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero ;
				})
			}
		}

		this.setState({
			matches: matches.filter(card => {
				return card.collectible === true
			})
		})

	}

	renderCardList = (cards) => {

			return cards.map(card => {
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
		}


	renderTen = () => {
		this.setState({
			totalRendered: this.state.totalRendered + 10
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
						<ul className='list-group cards'>
							{this.renderCardList(this.state.matches.slice(0, this.state.totalRendered))}
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