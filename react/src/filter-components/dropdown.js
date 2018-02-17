import React from 'react'

export default class DropDown extends React.Component {

	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);

	}

	renderOptions(array) {
		return array.map((item) => {
			return (
				<option value={item} key={item} className='small-text'>
					{item}
				</option>
			)
		})
	}

	handleChange(event) {
		console.log(this.props.filter)
		console.log(event.target.value)
		this.props.onChange(this.props.filter, event.target.value);
	}

	render() {
		return (
			<div>
				<select className='filter-dropdown hvr-border-fade' onChange={this.handleChange}>
					<option value="None" className='dropdown-placeholder'>{this.props.filterName}</option>
					{this.renderOptions(this.props.options)}
				</select>
			</div>
		)	
	}	
}