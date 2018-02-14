import React,{Component} from 'react'
import axios from 'axios'
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
            console.log(deckString)
            let newDeck = deckString.forEach(ds => {
                axios.get(`/blah/${ds[0]}`)
                .then(result2 => {
                    result2.data.cardQuantity = ds[1]
                    this.setState({
                        deck: [...this.state.deck, result2.data]
                    })
                    // return result2
                })
                // console.log(newDeck)
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
                <DeckBuilderList deck={this.state.deck}/>
            </div>
		)
	}
    
}