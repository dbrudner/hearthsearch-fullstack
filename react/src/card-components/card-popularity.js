import React from 'react'

export default function CardPopularity(props) {

    

    const usage = () => {
        if (props.decksInfo) {

            console.log(props)
            const hero = props.hero.toLowerCase()

            console.log('This card is in:', props.cardInclusions.standard[hero])
            console.log('Number of decks in this class:', props.decksInfo.wild[hero] * 2)

            const standardPercent = (props.cardInclusions.standard[hero]/(props.decksInfo.standard[hero] * 2) * 100).toFixed(2) + '%'
            const wildPercent = (props.cardInclusions.wild[hero]/(props.decksInfo.wild[hero] * 2) * 100).toFixed(2) + '%'


            if (props.hero === 'Neutral') {
                return <div/>
            } else {
                return (
                    <div>
                        <div className='standard'>
                            <span>Standard: {standardPercent === NaN ?standardPercent:<span>{(0).toFixed(2) + '%'}</span>}</span>
                        </div>
                        <span className='wild'>
                            <span>Wild: {wildPercent === NaN ?wildPercent:<span>{(0).toFixed(2) + '%'}</span>}</span>
                        </span>
                    </div>
                )
            }
        } else {
            return null
        }

        
    }

    return (
        <span className='card-popularity'>
            {usage()}
        </span>
    )
}