import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import _ from 'lodash';

import { addButtonStyle } from '../constants/styles';

import store from '../store';
import { toggleEditModelPropertyModal } from '../ducks/modal';

import ModelProp from './ModelProp';

class ModelModal extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  name: ``
			, mvp: false
			, complete: false
			, modelProps: this.props.modelProps.toJS()
			, editModelName: true
			, existing: false
		}
	}

	formatPropForDisplay() {
		let propArray = this.state.modelProps.map( modelProp => {
			if ( !modelProp.propName ) {
				return {};
			}

			let returnProp = {
				[ modelProp.propName ]: {
					type: modelProp._type
				}
			};

			for ( let key in modelProp.validators ) {
				// Check to see if validator is in use.
				if ( modelProp.validators[ key ].enabled ) {
					// Set the property on the display object. Slicing off the underscore
					returnProp[ modelProp.propName ][ key.slice( 1, key.length ) ] = modelProp.validators[ key ].value;
				}
			}

			return returnProp;
		});

		return _.assign( {}, ...propArray );
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	editName() {
		this.setState({ editModelName: true });
	}

	saveName() {
		if ( this.state.name ) {
			this.setState( { editModelName: false } );
		}
	}

	editProperty( property = {} ) {
		return store.dispatch( toggleEditModelPropertyModal( true, property ) )
	}

	modalClose() {
		return store.dispatch( toggleEditModelPropertyModal( false ) );
	}

	render() {
		let formattedData = this.formatPropForDisplay();

		return (
			<div>
				{ this.props.modal.getIn([`editModelPropertyModal`, `toggled`]) &&
					<ModalContainer onClose={ this.modalClose.bind( this ) }>
						<ModalDialog onClose={ this.modalClose.bind( this ) }>
							<ModelProp />
						</ModalDialog>
					</ModalContainer>
				}

				{ !this.state.editModelName
					?
						<div>
							<h2>{ this.state.name }</h2>
							<button
								key="editName"
								onClick={ this.editName.bind( this ) }
								style={ addButtonStyle }
							>
								Edit
							</button>
						</div>
					:
						<div>
							<h2>Model Name:</h2>
							<input
								onChange={ this.handleChange.bind( this, `name` ) }
								type="text"
								value={ this.state.name }
							/>
							<button
								key="saveName"
								onClick={ this.saveName.bind( this ) }
								style={ addButtonStyle }
							>
								Done
							</button>
						</div>
				}

				<label htmlFor="model-mvp">MVP?</label>
				<input
					id="model-mvp"
					onChange={ this.handleChange.bind( this, `mvp` ) }
					type="checkbox"
					value={ this.state.mvp }
				/>

				<pre>
					{ JSON.stringify( formattedData, null, 4 ) }
				</pre>

				<button
					onClick={ this.editProperty.bind( this ) }
					style={ addButtonStyle }
				>
					Add Property
				</button>
			</div>
		)
	}
}

export default connect( state => ({ modelProps: state.modelProps, modal: state.modal }))(Radium( ModelModal ));