import React from 'react'

export default function CardPopularity(props) {

    const hero = props.hero.toLowerCase()
    const allStandardDecks = props.decksInfo.standard
    const allStandardDecksWithCard = props.cardInclusions.standard

    let rate;    
    let percent;

    const usage = () => {

        if (props.hero !== 'Neutral') {
            let totalDecks = allStandardDecks[hero]
            let totalInclusions = allStandardDecksWithCard[hero]
            rate = totalInclusions/totalDecks;

            

            if (props.rarity !== 'Legendary') {
                rate = rate/2
            }

            percent = (rate*100).toFixed(2) + '%'
            
            if (totalDecks ===  0) {
                percent = '0.00%'
            }
        }

        if (props.hero === 'Neutral') {
            let totalDecks = 0
            for (let key in allStandardDecks) {
                totalDecks = totalDecks + allStandardDecks[key]
            }

            let totalInclusions = 0
            for (let key in allStandardDecksWithCard) {
                totalInclusions = totalInclusions + allStandardDecksWithCard[key]
            }
            rate = totalInclusions/totalDecks;

            // if (props.rarity !== 'Legendary') {
            //     rate = rate/2
            // }

            percent = (rate*100).toFixed(2) + '%'

            if (totalDecks ===  0) {
                percent = '0.00%'
            }

        }
        

        return (
            <div>
                {percent}
            </div>
        )

    }

    return (
        <span className='card-popularity'>
            {
                
                usage()
                
                }
        </span>
    )
}