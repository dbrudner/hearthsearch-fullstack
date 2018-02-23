import React from 'react'

export default class DeckSearchbar extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            term: ''
        }
    }

    onChange = (event) => {
        const term = event.target.value
        this.setState({
            term
        })

    }

    handleSubmit = (event) => {
        const filterName = 'term'
        const term = this.state.term

        this.props.getFilter(filterName, term)
    }

    render() {
        return (
            <div className='form-group'>
                <input onChange={this.onChange} type='text' name='term'/>
                <button onClick={this.handleSubmit} type='submit' class='btn submit-btn'>Search</button>
            </div>
        )
    }
}