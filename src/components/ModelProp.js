import React from 'react';
import PureComponent from 'react-pure-render/component';

import Validators from './Validators';

export default class ModelProp extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  propName: ``
			, _type: ``
			, validators: {
				_ref: {
					enabled: false
					, value: ``
				}
				, _required: {
					enabled: false
					, value: false
				}
				, _index: {
					enabled: false
					, value: false
				}
				, _default:  {
					enabled: true
					, value: ``
				}
				, _enum:  {
					enabled: false
					, values: []
				}
				, _match:  {
					enabled: true
					, regex: ``
				}
				, _minLength:  {
					enabled: false
					, min: 0
				}
				, _maxLength:  {
					enabled: false
					, max: 0
				}
				, _min:  {
					enabled: false
					, min: 0
				}
				, _max:  {
					enabled: true
					, max: 0
				}
			}
		}
	}

	selectType( event ) {
		this.setState({ _type: event.target.value })
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
					value={ this.state._type }
				>
					{ options }
				</select>

				<Validators type={ this.state._type} />

			</div>
		);
	}
}