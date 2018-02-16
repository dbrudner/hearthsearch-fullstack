import React,{Component} from 'react'

export default class extends Component{

    addToDeck(name, mana, rarity, cardSet, hero, dbfId, cardId, _id) {
        this.props.getCard(name, mana, rarity, cardSet, hero, dbfId, cardId, _id);
    }

    handleClick = (event) => {
        event.preventDefault()
        this.addToDeck(this.props.name, this.props.mana, this.props.rarity, this.props.cardSet, this.props.hero, this.props.dbfId, this.props.cardId, this.props._id)
        
    }

    render() {


        if (!this.props.buildMode) {
            return (<div/>)
        }

        return (
            <div>
                <button onClick={this.handleClick} 
                    className='btn add-to-deck-button center-block'
                    >Add to deck
                </button>
            </div>
        )
    }
}