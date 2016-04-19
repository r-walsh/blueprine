import React from 'react';
import PureComponent from 'react-pure-render/component';

export default class ModelProp extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			type: ``
		}
	}

	selectType( event ) {
		this.setState({ type: event.target.value })
	}

	renderStringValidators() {
		return (
			<div>
				<label htmlFor="">Enum</label>
				<input type="checkbox"/>

				<label htmlFor="">Match</label>
				<input type="checkbox"/>

				<label htmlFor="">Min Length</label>
				<input type="checkbox"/>

				<label htmlFor="">Max Length</label>
				<input type="checkbox"/>
			</div>
		);
	}

	renderNumberValidators() {
		return (
			<div>
				<label htmlFor="">Min</label>
				<input type="checkbox"/>

				<label htmlFor="">Max</label>
				<input type="checkbox"/>
			</div>
		)
	}
	
	render() {
		let options = [ ``, `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array` ]
							.map( ( option, index ) => <option value={ option } key={ index }>{ option }</option>);
		return (
			<div>
				<label>Property Name</label>
				<input type="text"/>
				<label>Type</label>
				<select
					onChange={ this.selectType.bind( this ) }
					value={ this.state.type }
				>
					{ options }
				</select>

			</div>
		);
	}
}