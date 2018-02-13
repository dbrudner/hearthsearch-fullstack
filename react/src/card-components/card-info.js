import React, {Component} from 'react'
import Rarity from './card-rarity'
import CardType from './card-type'
import Class from './card-class'
import HowToGet from './card-how-to-get'
import CardSet from './card-set'
import Flavor from './card-flavor'
import CardText from './card-text'
import CardName from './card-name'
import AddToDeck from './add-to-deck'
import CardSoundBoard from './card-sound-board'

export default class CardInfo extends Component{
	
	constructor(props) {
		super(props)

		this.state = {
			card: ''
		}

		this.getCard = this.getCard.bind(this);
	}

	getCard(name, mana, rarity, cardSet, hero, dbfId, cardId) {
		console.log('added')
		var card = {
			name,
			mana,
			rarity,
			cardSet,
			hero,
			dbfId,
			cardId
		}
		// console.log(this.state);
		this.props.getCard(card)
	}

	handleChange(event) {

		this.setState({ term: event.target.value });
		this.props.onSearch(event.target.value);
	}

	render() {
		return (
			<div className='card-info-container col-xs-12 col-md-9'>
				<div className='card-name'>
					<CardName name={this.props.name} />
					 <Class hero={this.props.class}/>
					<Flavor flavor={this.props.flavor} />
				</div>
				<hr/>
				<div className='row'>
					<div className='col-md-6 col-xs-12'>
						<ul className='card-info-list'>
							<li><strong>Mana:</strong> {this.props.cost ? this.props.cost : 0}</li>
							<Rarity rarity={this.props.rarity} />
							<CardSet cardSet={this.props.cardSet}/>
							<HowToGet howToGet={this.props.howToGet} howToGetGold={this.props.howToGetGold} />
						</ul>
					</div>
					<div className='col-md-6 col-xs-12'>
						<CardType attack={this.props.attack} health={this.props.health} type={this.props.type}/>
						<CardText text={this.props.text}/>
						<AddToDeck buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
						{ (this.props.type === 'Minion') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : <div/> }
						
					</div>
				</div>
			</div>
		)
	}	
}