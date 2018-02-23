import React from 'react'
import {Popover} from 'react-bootstrap'
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
                    Total Wild Decks: {totalWildDecks || 0}
                </span>
                <span className='cursor left-mrg'>
                    Total Standard Decks: {totalStandardDecks}
                </span>
            </div>
            <div className='text-center total-res'>
                Total Results: {props.totalResults}
            </div>
        </div>
    )
}