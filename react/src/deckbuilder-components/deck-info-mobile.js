import React from 'react'
import {StickyContainer, Sticky } from 'react-sticky'


export default function DeckInfoMobile(props) {

    const getQuantity = (deck) => {
        return deck.reduce((a, card) => {
            return card.quantity + a
        }, 0)
    }

    const cardsTotal = () => {
        return (
            <div className={'col-xs-4 quantity-deck-info'}>
                {getQuantity(props.deck)}/30
            </div>
        )
    }

    return (
        <div className='deck-info-mobile row text-center'>
            <div className={'col-xs-4 ' + props.hero.toLowerCase()} >
            {props.hero}
            </div>
            <div className={'col-xs-4 ' + props.format + '-deck-info'}>
            {props.format}
            </div >
            {cardsTotal()}
        </div>
    )

   
}