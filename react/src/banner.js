import React from 'react'
import potato from './images/potato.png'

export default function Banner(props) {
    return (
        <div className='banner'>
            <div className='banner-header'>
                <span>
                    <img src={potato} className='potato'/>
                    </span>
                    <strong>HearthSearch</strong>
                    <span className='banner-description'> card searching and deck construction</span>
            </div>
        </div>
    )
}