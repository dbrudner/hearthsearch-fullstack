import React from 'react'

export default function CardPopularity(props) {

    const hero = props.hero.toLowerCase()
    const allStandardDecks = props.decksInfo.standard
    const allStandardDecksWithCard = props.cardInclusions.standard

    const allWildDecks = props.decksInfo.wild
    const allWildDecksWithCard = props.cardInclusions.wild


    let rate;    
    let percent;

    const standardUsage = () => {

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
        
        if (props.hero !== 'Neutral') {
            return (
                <div>
                    Used in {percent} of all Standard <span className={props.hero.toLowerCase()}>{props.hero}</span> decks.
                </div>
            )
        }

        if (props.hero === 'Neutral') {
            return (
                <div>
                    Used in {percent} of all Standard decks.
                </div>
            )
        }

        

    }

    const wildUsage = () => {
        if (props.hero !== 'Neutral') {
            let totalDecks = allWildDecks[hero]
            let totalInclusions = allWildDecksWithCard[hero]
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
            for (let key in allWildDecks) {
                totalDecks = totalDecks + allWildDecks[key]
            }

            let totalInclusions = 0
            for (let key in allWildDecksWithCard) {
                totalInclusions = totalInclusions + allWildDecksWithCard[key]
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
        

        if (props.hero !== 'Neutral') {
            return (
                <div>
                    Used in {percent} of all Wild <span className={props.hero.toLowerCase() + ''}>{props.hero}</span> decks.
                </div>
            )
        }

        if (props.hero === 'Neutral') {
            return (
                <div>
                   Used in {percent} of all Wild decks.
                </div>
            )
        }
    }

    return (
        <div className='card-popularity'>
            {
                <div>
                    <div>
                        {standardUsage()}
                    </div>
                    <div>
                        {wildUsage()}
                    </div>
                </div>
                
                }
        </div>
    )
}