import React,{Component} from 'react'

export default class extends Component{

    addToDeck(name, mana, rarity, cardSet, hero, dbfId, cardId) {
        this.props.getCard(name, mana, rarity, cardSet, hero, dbfId, cardId);
    }

    

    render() {

        if (!this.props.buildMode) {
            return (<div/>)
        }

        return (
            <div>
                <button onClick={() => {
                    this.addToDeck(this.props.name, this.props.mana, this.props.rarity, this.props.cardSet, this.props.hero, this.props.dbfId, this.props.cardId)
                }} 
                    className='btn add-to-deck-button center-block'
                    >Add to deck
                </button>
            </div>
        )
    }
}