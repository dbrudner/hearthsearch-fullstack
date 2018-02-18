import React from 'react'

export default function(props) {
    return (
        <div>
            <span className='avg-curve'>Average: </span><span className='curve'>{props.curve}</span>
        </div>
    )
            
          
}