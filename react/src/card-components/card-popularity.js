import React from 'react'

export default function CardPopularity(props) {


    const usage = () => {
        if (props.decksInfo && props.cardInclusions) {

            const hero = props.hero.toLowerCase()

            console.log(props.rarity)


            if (props.hero === 'Neutral') {
                console.log(props.rarity)
                console.log(props.cardInclusions.wild)
                console.log(props.cardInclusions.standard)
                

                let inclusionsWild = 0

                for (let key in props.cardInclusions.wild) {
                    inclusionsWild = inclusionsWild + props.cardInclusions.wild[key]
                }

                let totalWildDecks = 0

                for (let key in props.decksInfo.wild) {
                    totalWildDecks = totalWildDecks + props.decksInfo.wild[key]
                }

                let inclusionsStandard = 0

                for (let key in props.cardInclusions.standard) {
                    inclusionsStandard = inclusionsStandard + props.cardInclusions.standard[key]
                }

                let totalStandardDecks = 0

                for (let key in props.decksInfo.standard) {
                    totalStandardDecks = totalStandardDecks + props.decksInfo.standard[key]
                }

                console.log(inclusionsWild)
                console.log(inclusionsStandard)

                if (props.rarity === 'Legendary') {
                    const standardPercent = ((inclusionsStandard/totalStandardDecks) * 100).toFixed(2) + '%'
                    const wildPercent = ((inclusionsWild/totalWildDecks) * 100).toFixed(2) + '%'
                    console.log(standardPercent)
                    console.log(wildPercent)
                    return (
                        <div>
                            <div className='standard'>
                                <span>Standard: {standardPercent}</span>
                            </div>
                            <span className='wild'>
                                <span>Wild: {wildPercent}</span>
                            </span>
                        </div>
                    )
                    
                } else {
                    const wildPercent = inclusionsWild/(totalWildDecks * 2)
                    const standardPercent = inclusionsStandard/(totalStandardDecks * 2)
                    console.log(standardPercent)
                    console.log(wildPercent)
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
                
                return (
                    <div>
                        
                    </div>
                )
            } else {

                const standardPercent = (props.cardInclusions.standard[hero]/(props.decksInfo.standard[hero] * 2) * 100).toFixed(2) + '%'

                const wildPercent = (props.cardInclusions.wild[hero]/(props.decksInfo.wild[hero] * 2) * 100).toFixed(2) + '%'

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