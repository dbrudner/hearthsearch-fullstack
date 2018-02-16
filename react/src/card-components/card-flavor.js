import React from 'react'

export default function CardFlavor(props) {

	const filtered = (string) => {
		var newString = string.replace(/<i>/g, "")
		newString = newString.replace(/<\/i>/g, "")
		return newString;
	}

	if (props.flavor) {
		return (
			<div className='padding'>
				<div className=''>
					{filtered(props.flavor)}
				</div>
			</div>
		)
	}
	return (
		<div/>
	)
	
}