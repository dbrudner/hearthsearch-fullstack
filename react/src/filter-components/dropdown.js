import React from 'react'

export default class DropDown extends React.Component {

	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);

	}

	renderOptions(array) {
		return array.map((item) => {
			return (
				<option value={item} key={item}>
					{item}
				</option>
			)
		})
	}

	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render() {
		return (
			<div className='input-field'>
				<select className='' onChange={this.handleChange}>
					<option>{this.props.filterName}</option>
					{this.renderOptions(this.props.options)}
				</select>
			</div>
		)	
	}
	
}