import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function CardImage(props) {

	return (
		<div className='image-container col-sm-12 col-md-3'>
			{(props.image) ? 
				<ReactImageFallback 
					src={props.image}
					fallbackImage='images/card_back_legend.gif'
					className='card-image center-block'
					initialImage='images/card_back_legend.gif'
					alt={props.name}
				/>
			:
				<img 
					src='images/card_back_legend.gif'
					className='legend-cardback center-block'
					alt={props.name}
				/>
			}
			{props.artist ? <div className='artist'>Artist: {props.artist}</div> : <div />}
			<div className='wiki-link' ><a target='_blank' href={`https://hearthstone.gamepedia.com/${props.name}`}>wiki link</a></div>

		</div>
	)
	
}