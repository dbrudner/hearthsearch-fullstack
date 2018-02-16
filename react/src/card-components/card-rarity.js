import React from 'react'

export default function Rarity(props) {

	if (props.rarity === "Free") {
		return (
			<span><span className='rarity common'>Free</span></span>
		)
	}

	if (props.rarity === "Common") {
		return (
			<span><span className='rarity common'>Common</span></span>
		)
	}

	if (props.rarity === "Rare") {
		return (
			<span><span className='rarity rare'>Rare</span></span>
		)
	}

	if (props.rarity === "Epic") {
		return (
			<span><span className='rarity epic'>Epic</span></span>
		)
	}

	if (props.rarity === "Legendary") {
		return (
			<span><span className='rarity legendary'>Legendary</span></span>
		)
	}

	return (
		<div></div>
	)
}