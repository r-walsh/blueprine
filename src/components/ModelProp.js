import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { addButtonStyle, label, textInput, textArea } from '../constants/styles';

import store from '../store';
import { toggleEditModelPropertyModal } from '../ducks/modal';
import { addProp } from '../ducks/modelProps';

class ModelProp extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  propName: ``
			, _type: ``
			, description: ``
		};
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	saveProp() {
		if ( this.state.propName && this.state._type && this.state.description ) {
			store.dispatch( addProp( {
				  propName: this.state.propName
				, _type: this.state._type
				, description: this.state.description
			} ) );
			return store.dispatch( toggleEditModelPropertyModal( false ) );
		}
	}

	render() {
		let options = [ ``, `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array` ]
							.map( ( option, index ) => <option value={ option } key={ index }>{ option }</option> );

		return (
			<div>
				<label style={ label }>Property Name</label>
				<input
					onChange={ this.handleChange.bind( this, `propName` ) }
					style={ textInput }
					type="text"
					value={ this.state.propName }
				/>
				<label style={ label }>Type</label>
				<select
					onChange={ this.handleChange.bind( this, `_type` ) }
					value={ this.state._type }
				>
					{ options }
				</select>

				<div />

				<label style={ label }>Description</label>
				<textarea
					cols="30"
					onChange={ this.handleChange.bind( this, `description` ) }
					rows="8"
					style={ textArea }
					value={ this.state.description }
				/>

				<button
					key="saveProp"
					onClick={ this.saveProp.bind( this ) }
					style={ addButtonStyle }
				>
					Save
				</button>
			</div>
		);
	}
}

export default Radium( ModelProp );