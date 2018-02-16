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
import CardBasicInfo from './card-basic-info'
import CardImage from './card-image'
import CardPopularity from './card-popularity'
import CardFlavor from './card-flavor'
import CardClass from './card-class'

export default class CardInfo extends Component{
	
	constructor(props) {
		super(props)

		this.state = {
			card: ''
		}

	}

	getCard = (name, mana, rarity, cardSet, hero, dbfId, cardId) => {
		var card = {
			name,
			mana,
			rarity,
			cardSet,
			hero,
			dbfId,
			cardId
		}
		this.props.getCard(card)
	}

	handleChange(event) {

		this.setState({ term: event.target.value });
		this.props.onSearch(event.target.value);
	}

	render() {


		return (
			<div className=''>
				<div className='card-list-header'>
					<CardClass hero={this.props.class}/>				
					<CardPopularity />
				</div>
				<CardImage image={this.props.image} artist={this.props.artist}/>
				<hr/>
				<AddToDeck buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>		
				<CardFlavor flavor={this.props.flavor} />											
				{/* { (this.props.type === 'Minion') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : null } */}
			</div>
		)
	}	
}