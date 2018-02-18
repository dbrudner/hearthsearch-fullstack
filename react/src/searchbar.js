import React from 'react';

class Searchbar extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			term: '',
			filterControls: false
		}

	}

	handleChange = (event) => {
		this.setState({ term: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSearch('term', this.state.term);		
	}
	
	render() {

		

		return (
			<div className='animated fadeIn'>
				<form onSubmit={this.handleSubmit} >
					<div className='row'>
						<div className='col-xs-10'>
							<input className='search-bar-input' type="text" name="term" onChange={this.handleChange}/>
						</div>
						<div className='col-xs-2'>
							<button type='submit' className='btn search-btn hvr-fade'>
								<i className="fas fa-search"></i>
							</button>							
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Searchbar;