import React from 'react'

export default function CardClass(props) {

	console.log(props)

	if (props.hero === 'Paladin') {
		return (
			<div className='paladin class'>Paladin</div>
		)
	}

	if (props.hero === 'Druid') {
		return (
			<div className='druid class'>Druid</div>
		)
	}

	if (props.hero === 'Warrior') {
		return (
			<div className='warrior class'>Warrior</div>
		)
	}

	if (props.hero === 'Warlock') {
		return (
			<div className='warlock class'>Warlock</div>
		)
	}

	if (props.hero === 'Mage') {
		return (
			<div className='mage class'>Mage</div>
		)
	}

	if (props.hero === 'Hunter') {
		return (
			<div className='hunter class'>Hunter</div>
		)
	}

	if (props.hero === 'Rogue') {
		return (
			<div className='rogue class'>Rogue</div>
		)
	}

	if (props.hero === 'Shaman') {
		return (
			<div className='shaman class'>Shaman</div>
		)
	}

	if (props.hero === 'Priest') {
		return (
			<div className='priest class'>Priest</div>
		)
	}

	if (props.hero === 'Neutral') {
		return (
			<div className='neutral class'>Neutral</div>
		)
	}

	return (
		<div></div>
	)
}