import React from 'react'
import { Link } from 'react-router-dom'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import DeckSearchCardTile from './deck-search-card-tile'
import _ from 'lodash'

export default function DeckSearchResults(props) {

    const cardPopover = card => {
        return (
            <div>
                card'
            </div>
        )
    }

    const DeckList = deck => {

        let sorted = _.orderBy(deck, '_id.cost', 'asc')

        console.log(sorted)

        return sorted.map(cardObj => {
            const card = cardObj._id
            const quantity = cardObj.cardQuantity

            var source = `https://art.hearthstonejson.com/v1/tiles/${card.cardId}.png`
        
            const mana = () => {
        
                if (!card.cost) {
                return <div className='card-deck-list-mana'>0</div>                        
                }
        
        
                if (card.cost === 0) {
                    return <div className='card-deck-list-mana'>0</div>                        
                }
        
                if (card.cost >= 10) {
                    return <div className='card-deck-list-mana-10'>{card.cost}</div>                        
                }
        
                if (card.cost) {
                    return <div name={card.name} className='card-deck-list-mana'>{card.cost}</div>
                }
                
            }
        
            return (
                <div className='' name={card.card} className='deck-list-tile-container'>
                    <div>
                        <span  className='deck-list-cn'>
                        {card.name} {(quantity === 2) ? (<span className=''>x{quantity}</span>) : null}
                        </span>
                    <div className='deck-card-tile center-block' name={card.card}>
                        <div className='deck-gray-box' name={card.card} >
                            {mana()}
                        </div>
                        <div className='tile-img-cntr' name={card.card} >
                            <img name={card.name} alt={`${quantity} ${card.name}`} className='deck-card-tile' src={source} />
                        </div>
                    </div> 
                    </div>
                </div>
            )
        })
    

    }

    const renderResults = (results) => {
        

        
        return results.map(result => {
            
            let hero = result.hero
            hero = hero.charAt(0).toUpperCase() + hero.slice(1)

            const deckList = () => {

                return (
                    <Popover class='deck-search-deck-list' id="popover-positioned-left">
                        <div>
                        {DeckList(result.cards)}
                        </div>
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