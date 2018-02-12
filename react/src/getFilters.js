const getFilters = {
    getTerm: (term) => {
		this.setState({term})
	},

	getHero: (hero) => {
		this.setState({hero})
	},

	getType: (type) => {
		this.setState({type})
	},

	getRarity: (rarity) => {
		this.setState({rarity})
	},

	getCardSet: (cardSet) => {
		this.setState({cardSet})
	},

	getMana: (mana) => {
		this.setState({mana})
	},

	getAttack: (attack) => {
		this.setState({attack})
	},

	getHealth: (health) => {
		this.setState({health})
	},

	getMinMana: (minMana) => {
		this.setState({minMana})
	},

	getMaxMana: (maxMana) => {
		this.setState({maxMana})
	},

	getMinAttack: (minAttack) => {
		this.setState({minAttack})
	},

	getMaxAttack: (maxAttack) => {
		this.setState({maxAttack})
	},

	getMinHealth: (minHealth) => {
		this.setState({minHealth})
	},

	getMaxHealth: (maxHealth) => {
		this.setState({maxHealth})
	},

	getGameFormat: (gameFormat) => {
		this.setState({gameFormat})
	},
	
	getAbility: (ability) => {
		this.setState({ability})
	},

	getAbility2: (ability2) => {
		this.setState({ability2})
	},

	getTribe: (tribe) => {
		this.setState({tribe})
	},

	getCard: (card) => {

		this.setState(() => {
			return {card: card}
		})
	}
}

export default getFilters