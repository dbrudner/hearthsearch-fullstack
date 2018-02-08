import React from 'react';

class Searchbar extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			term: '',
			filterControls: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ term: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSearch(this.state.term);		
	}
	
	render() {

		

		return (
			<div className='search-bar form-group'>
				<form onSubmit={this.handleSubmit} >
					<div class='row'>
						<div class='col-xs-10'>
							<input className='form-control' type="text" name="term" onChange={this.handleChange}/>													
						</div>
						<div class='col-xs-2'>
							<button type='submit' className='btn btn-primary'>Submit</button>							
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Searchbar;