import React from 'react'
import { Link } from 'react-router-dom'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import DeckSearchDeckList from './deck-search-deck-list'

export default function DeckSearchResults(props) {


    const renderResults = (results) => {

        return results.map(result => {
            let hero = result.hero
            hero = hero.charAt(0).toUpperCase() + hero.slice(1)

            const deckList = () => {
                return (
                    <Popover id="popover-positioned-left">
                        <DeckSearchDeckList deck={result} />
                    </Popover>
                )
            }

            return (
                <div className='panel deck-panel' key={result._id}>
                    <div className='deck-box'>
                        <div>
                            <div className='deck-box-name'>
                                <Link to={`deck/${result._id}`}>{result.name}</Link>
                            </div>
                            <div className='deck-list-src'>
                                {result.source === 'HearthPwn' ?
                                    <div>
                                        <strong>
                                            <a target='_blank' href={`https://www.hearthpwn.com/members/${result.user}`}>{result.user}</a>
                                        </strong> 
                                        <span> from </span>
                                        <a target='_blank' href={`https://www.hearthpwn.com/members/${result.user}`}>
                                            <span className='hearthpwn'>{result.source}</span>
                                        </a>
                                    </div>                                                                   
                                    : 
                                    <span className='hearthtato'> HearthTato</span>
                                }

                            </div>
                            <div className='quick-peek'>
                                <OverlayTrigger trigger='click' placement='right' overlay={deckList()}>
                                    <div className="btn btn-info hvr-fade">
                                        <span className="glyphicon glyphicon-folder-open"></span>
                                        <span className='smlleftmrg'>Expand Deck List</span>
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className={result.hero + ' deckbox-hero'}>{hero} - </span>
                                <span className='deckbox-archetype'>{result.archetype}</span>
                            </div>
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