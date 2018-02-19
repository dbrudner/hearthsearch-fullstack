import React from 'react'

export default function CardPopularity(props) {



    const standardUsage = () => {


        if (props.hero === 'Neutral') {
            return <div/>
        } else {
            return (
                <div>
                    {props.inclusionsStandard[props.hero.toLowerCase()]}
                </div>                    
            )
        }
    }

    return (
        <span className='card-popularity'>
            {standardUsage()}
        </span>
    )
}