import React from 'react';
import PureComponent from 'react-pure-render/component';

export default class ModelProp extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  propName: ``
			, _type: ``
			, description: ``
		};
	}

	selectType( event ) {
		this.setState( { _type: event.target.value } );
	}

	render() {
		let options = [``, `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array`]
							.map( ( option, index ) => <option value={ option } key={ index }>{ option }</option> );

		return (
			<div>
				<label>Property Name</label>
				<input type="text" />
				<label>Type</label>
				<select
					onChange={ this.selectType.bind( this ) }
					value={ this.state._type }
				>
					{ options }
				</select>

				<label>Description</label>
				<textarea
					cols="20"
					rows="10"
				/>
			</div>
		);
	}
}