import React from 'react'
import DropDown from './dropdown'


export default class Filters extends React.Component {

	constructor(props) {
		super(props)
	}

	getFilter = (filterName, filterValue) => {
		this.props.getFilter(filterName, filterValue)
		console.log(filterName, filterValue)
	}


	render() {

		const classes = ["", "Neutral", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()
		const types = ["", "Minion", "Spell", "Weapon"].sort()
		const rarities = ["", "Free", "Common", "Rare", "Epic", "Legendary"]
		const cardSets = ["", "Basic","Blackrock Mountain","Classic","Goblins vs Gnomes","Hall of Fame","Journey to Un'Goro","Knights of the Frozen Throne","Kobolds & Catacombs","Mean Streets of Gadgetzan","Naxxramas","One Night in Karazhan","Tavern Brawl","The Grand Tournament","The League of Explorers","Whispers of the Old Gods"]
		const mana = ["","0","1","2","3","4","5","6","7","8","9","10",">10"]
		const attack = ["","0","1","2","3","4","5","6","7","8","9","10",">10"]
		const health = ["", "0","1","2","3","4","5","6","7","8","9","10",">10"]
		const gameFormats = ["", "Standard", "Wild"]
		const abilities = ["", "Charge", "Taunt", "Divine Shield", "Deathrattle", "Battlecry", "Silence", "Choose one", "Combo", "Adapt", "Discover", "Freeze", "Enrage", "Inspire", "Lifesteal", "Overload", "Windfury", "Poisonous", "Quest", "Stealth", "Draw", "Can't be targeted", "Discard"].sort()
		const tribe = ["", "Beast", "Demon", "Dragon", "Elemental", "Mech", "Murloc", "Pirate", "Totem"]

		return (
			<div>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						Filters
					</div>
					<div className='panel-body'>
						<div className='row'>
							{!this.props.deckBuilder ? <div className='col-sm-12 '>
								<div className='filter-header'>Class</div>
								<DropDown filter='hero' onChange={this.getFilter}  options={classes}/>
							</div> : null}
							
							<div className='col-sm-12'>
								<div className='filter-header'>Card Type</div>
								<DropDown filter='type' onChange={this.getFilter}  options={types}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Game Format</div>
								<DropDown filter='gameFormat' onChange={this.getFilter} options={gameFormats} />
 							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Rarity</div>
								<DropDown filter='rarity' onChange={this.getFilter}  options={rarities}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Card Set</div>
								<DropDown filter='cardSet' onChange={this.getFilter} options={cardSets}/>
							</div>
						</div>
						<hr/>
						<div className='row second-row'>
 							<div className='col-sm-12'>
								<div className='filter-header'>Ability</div>
								<DropDown filter='ability' onChange={this.getFilter} options={abilities} />
 							</div>
 							<div className='col-sm-12'>
								<div className='filter-header'>Ability 2</div>
								<DropDown filter='ability2' onChange={this.getFilter} options={abilities} />
 							</div>
 							<div className='col-sm-12'>
								<div className='filter-header'>Tribe</div>
								<DropDown filter='tribe' onChange={this.getFilter} options={tribe} />
 							</div>
							 <div className='col-sm-12'>
								<div className='filter-header'>Mana</div>
								<DropDown filter='mana' onChange={this.getFilter} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Attack</div>
								<DropDown filter='attack' onChange={this.getFilter} options={attack}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Health</div>
								<DropDown filter='health' onChange={this.getFilter} options={health}/>
							</div>
						</div>
						<hr/>
						<div className='row third-row'>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Mana</div>
								<DropDown filter='minMana' onChange={this.getFilter} options={mana}/>
							</div>
							
							<div className='col-sm-12'>
								<div className='filter-header'>Max Mana</div>
								<DropDown filter='maxMana' onChange={this.getFilter} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Attack</div>
								<DropDown filter='minAttack' onChange={this.getFilter} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Max Attack</div>
								<DropDown filter='maxAttack' onChange={this.getFilter} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Health</div>
								<DropDown filter='minHealth' onChange={this.getFilter} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Max Health</div>
								<DropDown filter='maxHealth' onChange={this.getFilter} options={mana}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)	
	}
	
	
}