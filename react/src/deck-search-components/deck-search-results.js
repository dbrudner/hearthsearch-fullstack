import React from 'react'
import { Link } from 'react-router-dom'

export default function DeckSearchResults(props) {

    console.log(props.matches)

    const renderResults = (results) => {
        return results.map(result => {
            return (
                <div className='panel deck-panel' key={result._id}>
                    <div className='deck-box'>
                        <div>
                            <div className='deck-box-name'>
                                {result.name}
                            </div>
                            <div>
                                {result.source === 'HearthPwn' ?
                                    <div>
                                        <strong>
                                            <a href={`https://www.hearthpwn.com/members/${result.user}`}>{result.user}</a>
                                        </strong> 
                                        <span> from </span>
                                        <a href={`https://www.hearthpwn.com/members/${result.user}`}>
                                            <span className='hearthpwn'>{result.source}</span>
                                        </a>
                                    </div>                                                                   
                                    : 
                                    <span className='hearthtato'> HearthTato</span>
                                }

                            </div>
                        </div>
                        <div>
                            <span className={result.hero}>{result.hero}</span>
                        </div>
                    </div>

                </div>
            )
        })
    }

    return (
        <div className=''>
            {renderResults(props.matches)}
        </div>
    )
}