import React from 'react'
import DropDown from './dropdown'
import CardTextSearchbar from './card-text-searchbar'


export default class Filters extends React.Component {

	constructor(props) {
		super(props)

		this.heroChange = this.heroChange.bind(this);
		this.typeChange = this.typeChange.bind(this);
		this.rarityChange = this.rarityChange.bind(this);
		this.cardSetChange = this.cardSetChange.bind(this);
		this.manaChange = this.manaChange.bind(this);
		this.attackChange = this.attackChange.bind(this);
		this.healthChange = this.healthChange.bind(this);
		this.minManaChange = this.minManaChange.bind(this);
		this.maxManaChange = this.maxManaChange.bind(this);
		this.minAttackChange = this.minAttackChange.bind(this);
		this.maxAttackChange = this.maxAttackChange.bind(this);
		this.minHealthChange = this.minHealthChange.bind(this);
		this.maxHealthChange = this.maxHealthChange.bind(this);
		this.gameFormatChange = this.gameFormatChange.bind(this);
		this.abilityChange = this.abilityChange.bind(this);
		this.ability2Change = this.ability2Change.bind(this);
		this.tribeChange = this.tribeChange.bind(this);
	}

	heroChange(hero) {
		this.props.getHero(hero);
	}

	typeChange(type) {
		this.props.getType(type);
	}

	rarityChange(rarity) {
		this.props.getRarity(rarity);
	}

	cardSetChange(cardSet) {
		this.props.getCardSet(cardSet);
	}

	manaChange(mana) {
		this.props.getMana(mana);
	}

	attackChange(attack) {
		this.props.getAttack(attack);
	}

	healthChange(health) {
		this.props.getHealth(health);
	}

	minManaChange(minMana) {
		this.props.getMinMana(minMana);
	}

	maxManaChange(maxMana) {
		this.props.getMaxMana(maxMana);
	}

	minHealthChange(minhealth) {
		this.props.getMinHealth(minhealth);
	}

	maxHealthChange(maxHealth) {
		this.props.getMaxHealth(maxHealth);
	}

	minAttackChange(minAttack) {
		this.props.getMinAttack(minAttack);
	}

	maxAttackChange(maxAttack) {
		this.props.getMaxAttack(maxAttack);
	}

	gameFormatChange(gameFormat) {
		this.props.getGameFormat(gameFormat)
	}

	abilityChange(ability) {
		this.props.getAbility(ability)
	}

	ability2Change(ability2) {
		this.props.getAbility2(ability2)
	}

	tribeChange(tribe) {
		this.props.getTribe(tribe)
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
								<DropDown onChange={this.heroChange}  options={classes}/>
							</div> : null}
							
							<div className='col-sm-12'>
								<div className='filter-header'>Card Type</div>
								<DropDown onChange={this.typeChange}  options={types}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Game Format</div>
								<DropDown onChange={this.gameFormatChange} options={gameFormats} />
 							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Rarity</div>
								<DropDown onChange={this.rarityChange}  options={rarities}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Card Set</div>
								<DropDown onChange={this.cardSetChange} options={cardSets}/>
							</div>
						</div>
						<hr/>
						<div className='row second-row'>
 							<div className='col-sm-12'>
								<div className='filter-header'>Ability</div>
								<DropDown onChange={this.abilityChange} options={abilities} />
 							</div>
 							<div className='col-sm-12'>
								<div className='filter-header'>Ability 2</div>
								<DropDown onChange={this.ability2Change} options={abilities} />
 							</div>
 							<div className='col-sm-12'>
								<div className='filter-header'>Tribe</div>
								<DropDown onChange={this.tribeChange} options={tribe} />
 							</div>
							 <div className='col-sm-12'>
								<div className='filter-header'>Mana</div>
								<DropDown onChange={this.manaChange} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Attack</div>
								<DropDown onChange={this.attackChange} options={attack}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Health</div>
								<DropDown onChange={this.healthChange} options={health}/>
							</div>
						</div>
						<hr/>
						<div className='row third-row'>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Mana</div>
								<DropDown onChange={this.minManaChange} options={mana}/>
							</div>
							
							<div className='col-sm-12'>
								<div className='filter-header'>Max Mana</div>
								<DropDown onChange={this.maxManaChange} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Attack</div>
								<DropDown onChange={this.minAttackChange} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Max Attack</div>
								<DropDown onChange={this.maxAttackChange} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Min Health</div>
								<DropDown onChange={this.minhealthChange} options={mana}/>
							</div>
							<div className='col-sm-12'>
								<div className='filter-header'>Max Health</div>
								<DropDown onChange={this.maxHealthChange} options={mana}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)	
	}
	
	
}