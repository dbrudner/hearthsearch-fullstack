import React from 'react'

export default function DeckSearchResults(props) {

    console.log(props)

    const renderResults = (results) => {
        results.map(result => {
            return (
                <div>
                    {result.name}
                </div>
            )
        })
    }

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                {/* {totalResults} results */}
            </div>
            <div className='panel-body'>

            </div>
        </div>
    )
}