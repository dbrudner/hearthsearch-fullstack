import React,{Component} from 'react'
import axios from 'axios'
import DeckBuilder from '../deck-builder'
import DeckBuilderList from '../deckbuilder-components/deck-builder-list'
import { SIGVTALRM } from 'constants';

export default class DeckImport extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            deckString: ''
        }
    }

    handleChange = (event) => {
		this.setState({ deckString: event.target.value });
	}

	handleSubmit = (event) => {
        event.preventDefault();

        // axios.get('/blah/aklsdfasdf')
        // .then(result => {
        //     console.log(result)
        // })

        axios.get(`/api/import/${this.state.deckString}`)
        .then(result => {
            let deckString = result.data.cards
            let hero = result.data.heroes[0]

            if (hero === 893 || hero === 47817) {
                this.setState({
                    hero: 'Warlock'
                })
            }
            if (hero === 31 || hero === 2826) {
                this.setState({
                    hero: 'Hunter'
                })
            }
            if (hero === 637 || hero === 39117) {
                this.setState({
                    hero: 'Mage'
                })
            }
            if (hero === 40195 || hero === 930) {
                this.setState({
                    hero: 'Rogue'
                })
            }
            if (hero === 274) {
                this.setState({
                    hero: 'Druid'
                })
            }
            if (hero === 1066 || hero === 40183) {
                this.setState({
                    hero: 'Shaman'
                })
            }
            if (hero === 813 || hero === 41887) {
                this.setState({
                    hero: 'Priest'
                })
            }
            if (hero === 671 || hero === 2827 || hero === 46116) {
                this.setState({
                    hero: 'Paladin'
                })
            }
            if (hero === 7 ||hero === 2828) {
                this.setState({
                    hero: 'Warrior'
                })
            }

            let newDeck = deckString.forEach(ds => {
                axios.get(`/blah/${ds[0]}`)
                .then(result2 => {
                    result2.data.cardQuantity = ds[1]
                    this.setState({
                        deck: [...this.state.deck, result2.data]                        
                    })
                    // return result2
                })
            })
            
        })

	}
	
	render() {

		return (
            <div>
                <div className='search-bar form-group'>
                    <form onSubmit={this.handleSubmit} >
                        <div className='row'>
                            <div className='col-xs-10'>
                                <input className='form-control' type="text" name="term" onChange={this.handleChange}/>													
                            </div>
                            <div className='col-xs-2'>
                                <button type='submit' className='btn btn-primary'>Submit</button>							
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.deck.length > 0 ? <DeckBuilder hero={this.state.hero} deck={this.state.deck}/> : <div>Upload a deck</div>}
            </div>
		)
	}
    
}