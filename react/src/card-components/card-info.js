import React, {Component} from 'react'
import AddToDeck from './add-to-deck'
import CardImage from './card-image'
import CardPopularity from './card-popularity'
import CardFlavor from './card-flavor'
import CardClass from './card-class'
import CardSoundBoard from './card-sound-board'
import CardLightForge from './card-lightforge'
import CardRarity from './card-rarity'

export default class CardInfo extends Component{
	
	constructor(props) {
		super(props)

		this.state = {
			card: ''
		}

	}

	getCard = (name, mana, rarity, cardSet, hero, dbfId, cardId, _id) => {
		var card = {
			name,
			mana,
			rarity,
			cardSet,
			hero,
			dbfId,
			cardId,
			_id
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
					<div>
						<div>
							<CardClass hero={this.props.class}/>
						</div>
						<div>
							<CardLightForge lightForge={this.props.lightForgeScore}/>
						</div>
					</div>
					<div>
						<div>					
							<CardPopularity />
						</div>
						<div>
						</div>
					</div>
				</div>
				<CardImage image={this.props.image} artist={this.props.artist}/>
				<hr/>
				<div class='bottom-card-container'>
					<AddToDeck _id={this.props._id} buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>		
					<CardRarity rarity={this.props.rarity} type={this.props.type} />					
					<CardFlavor flavor={this.props.flavor} />											
					{ (this.props.type === 'Minion') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : null }
				</div>
			</div>
		)
	}	
}