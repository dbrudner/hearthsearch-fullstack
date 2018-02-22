import React from 'react'

import DeckSearchFilters from './deck-search-filters'
import DeckSearchResults from './deck-search-results'

export default function DeckSearchRow(props) {

    return (
        <div className='row'>
            <div className='col-lg-3'>
                <DeckSearchFilters getFilter={props.getFilter}/>
            </div>
            <div className='col-lg-9'>
                <DeckSearchResults matches={props.matches}/>
            </div>
        </div>
    )
}