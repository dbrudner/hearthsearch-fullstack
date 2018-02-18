import React from 'react'
import Nav from '../nav-components/nav'
import axios from 'axios'
import _ from 'lodash'
import { Redirect } from 'react-router-dom';


export default class DeckBuilderDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deckName: '',
            decks: [],
            archetypes: [],
            description: '',
            redirectTo: null
        }
    }

    componentDidMount() {
        axios.get('/api/decks')
        .then((result) => {

            let archetypes = result.data.map(deck => {
                return deck.archetype
            })

            archetypes = _.uniq(archetypes)
            archetypes = archetypes.filter(archetype => {
                return archetype !== 'archetype'
            })

            console.log(archetypes)

            this.setState({
                decks: result.data,
                archetypes
            })
        })
        .then(() => {
            console.log(this.state.decks)
        })

        

    }

    handleChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()        

        axios.post(`/deck/update/`, {
            deckId: this.props.match.params.deckId,
            archetype: this.state.archetype,
            description: this.state.description,
            name: this.state.deckName
        })
        .then(res => {
            console.log(res)
            this.setState({
                redirectTo: `/deck/${this.props.match.params.deckId}`
            })
        })
    }

    render() {
            const archetypes = this.state.archetypes.map(archetype => {
                return (
                    <option value={archetype}>
                        {archetype}
                    </option>
                )
            })

            if (this.state.redirectTo) {
                return <Redirect to={{ pathname: this.state.redirectTo }} />
            } 
        
        if (!this.state.redirectTo) {
            return (
                <div>
                    <div className='deck-details-form'>
                        <div className='form-group'>
                            <input onChange={(event) => {this.handleChange(event, 'deckName')}} name='deckName' className='form-control' placeholder='Deck Name' />
                        </div>
                        <select className="form-control" onChange={(event) => {this.handleChange(event, 'archetype')}}>
                            <option value="None">Archetype</option>
                            <option value="Aggressive Face">Aggressive Face</option>
                            <option value="Aggressive Board Control">Aggressive Board Control</option>
                            <option value="Midrange">Midrange</option>
                            <option value="Control">Control</option>
                            <option value="Miracle">Miracle</option>                    
                            <option value="One Turn Kill">One Turn Kill</option>
                            <option value="Fatigue">Fatigue</option>
                            {archetypes}
                        </select>
                        <div className="form-group">
                            <textarea placeholder='Description' onChange={(event) => {this.handleChange(event, 'description')}} className="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            )
        }

        

        
    }   
}