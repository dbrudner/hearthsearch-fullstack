import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function CardImage(props) {

	return (
		<div className='image-container'>
			{(props.image) ? 
				<ReactImageFallback 
					src={props.image}
					fallbackImage='images/card_back_legend.gif'
					className='hvr-float card-image center-block img-responsive'
					initialImage='images/card_back_legend.gif'
					alt={props.name}
				/>
			:
				<img 
					src='images/card_back_legend.gif'
					className='legend-cardback center-block img-fluid'
					alt={props.name}
				/>
			}
			{props.artist ? <div className='artist'>Artist: {props.artist}</div> : <div />}
			{/* <div className='wiki-link' ><a target='_blank' href={`https://hearthstone.gamepedia.com/${props.name}`}>Wiki</a></div> */}

		</div>
	)
	
}