import React from 'react'

export default function Rarity(props) {

	if (props.rarity === "Free") {
		return (
			<li><strong>Rarity: </strong><span className='rarity common'>Free</span></li>
		)
	}

	if (props.rarity === "Common") {
		return (
			<li><strong>Rarity: </strong><span className='rarity common'>Common</span></li>
		)
	}

	if (props.rarity === "Rare") {
		return (
			<li><strong>Rarity: </strong><span className='rarity rare'>Rare</span></li>
		)
	}

	if (props.rarity === "Epic") {
		return (
			<li><strong>Rarity: </strong><span className='rarity epic'>Epic</span></li>
		)
	}

	if (props.rarity === "Legendary") {
		return (
			<li><strong>Rarity: </strong><span className='rarity legendary'>Legendary</span></li>
		)
	}

	return (
		<div></div>
	)
}