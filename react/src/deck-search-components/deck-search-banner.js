import React from 'react'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import DeckSearchbar from './deck-searchbar'


export default function DeckSearchBanner(props) {


    const decks = props.decks

    const totalWildDecks = decks.reduce((acc, deck) => {
        if (deck.format === 'wild') {
            return acc + 1
        }
    }, 0)

    const totalStandardDecks = decks.reduce((acc, deck) => {
        if (deck.format === 'standard') {
            return acc + 1
        }
    }, 0)

    const decksByClass = format => {

        const classes = ["Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()

        console.log(format)

        if (format) {
            const render = () => {
                return classes.map(hero => {
    
                    const sumOfDecks = decks.reduce((acc, deck) => {
                        if (deck.hero.toLowerCase() === hero.toLowerCase() && deck.format.toLowerCase() === format) {
                            return acc = acc + 1
                        } else {
                            return acc
                        }
                    }, 0)
    
                    return (
                        <div className={hero.toLowerCase()}>
                            {hero}: {sumOfDecks}
                        </div>
                    )
                })
            }
            return (
                <div>
                    {render()}
                </div>
            )
        } else {
            const render = () => {
                return classes.map(hero => {
    
                    const sumOfDecks = decks.reduce((acc, deck) => {
                        if (deck.hero.toLowerCase() === hero.toLowerCase()) {
                            return acc = acc + 1
                        } else {
                            return acc
                        }
                    }, 0)
    
                    return (
                        <div className={hero.toLowerCase()}>
                            {hero}: {sumOfDecks}
                        </div>
                    )
                })
            }
    
    
            return (
                <div>
                    {render()}
                </div>
            )
        }

        
    }

    const popOverClasses = format => {
        return (
            <Popover id="popover-positioned-left">
                {decksByClass(format)}
            </Popover>
        )
    }

    decksByClass()

    return (
        <div className='panel deck-search-panel'>
            
            <div className='deck-search-hdr'>
                Deck Search
            </div>
            <div className='text-center'>
                <DeckSearchbar getFilter={props.getFilter} />
            </div>
            <div className='deck-totals'>
                <span className='cursor'>
                    <OverlayTrigger trigger='click' placement='left' overlay={popOverClasses('wild')}>
                        <span>
                            Total Wild Decks: {totalWildDecks || 0}
                        </span>
                    </OverlayTrigger>
                </span>
                <span className='cursor left-mrg'>
                    <OverlayTrigger trigger='click' placement='right' overlay={popOverClasses('standard')}>
                        <span>
                            Total Standard Decks: {totalStandardDecks}
                        </span>
                    </OverlayTrigger>
                </span>
            </div>
            <div className='text-center total-res'>
                <OverlayTrigger trigger='click' placement='bottom' overlay={popOverClasses()}>
                    <span className='cursor'>
                            Total Results: {props.totalResults}
                    </span>
                </OverlayTrigger>
            </div>
        </div>
    )
}