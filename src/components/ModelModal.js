import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import { addButtonStyle, colors } from '../constants/styles';

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
		};
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	editName() {
		this.setState( { editModelName: true } );
	}

	saveName() {
		if ( this.state.name ) {
			this.setState( { editModelName: false } );
		}
	}

	editProperty( property = {} ) {
		return store.dispatch( toggleEditModelPropertyModal( true, property ) );
	}

	modalClose() {
		return store.dispatch( toggleEditModelPropertyModal( false ) );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				{ this.props.modal.getIn( [`editModelPropertyModal`, `toggled`] ) &&
					<ModalContainer onClose={ this.modalClose.bind( this ) }>
						<ModalDialog onClose={ this.modalClose.bind( this ) }>
							<ModelProp />
						</ModalDialog>
					</ModalContainer>
				}

				{ !this.state.editModelName
					?
						<div>
							<div>
								<h2 style={ styles.modelName }>{ this.state.name }</h2>
							</div>
							<button
								key="editName"
								onClick={ this.editName.bind( this ) }
								style={ [addButtonStyle, styles.editNameButton] }
							>
								Edit
							</button>
						</div>
					:
						<div>
							<h2 style={ styles.namePlaceholder }>Model Name:</h2>
							<input
								onChange={ this.handleChange.bind( this, `name` ) }
								style={ styles.nameInput }
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

				<label
					htmlFor="model-mvp"
					style={ styles.mvpLabel }
				>
					MVP?
				</label>
				<input
					id="model-mvp"
					onChange={ this.handleChange.bind( this, `mvp` ) }
					type="checkbox"
					value={ this.state.mvp }
				/>
				<button
					onClick={ this.editProperty.bind( this ) }
					style={ [addButtonStyle, styles.addPropertyButton] }
				>
					Add Property
				</button>
				<pre>
					{ JSON.stringify( this.props.modelProps.toJS() ) }
				</pre>
			</div>
		);
	}

	getStyles() {
		return {
			addPropertyButton: {
				margin: `15px 0 0 0`
			  , display: `block`
			}
			, editNameButton: {
				margin: 5
			}
			, namePlaceholder: {
				  margin: `0 10px 10px 0`
				, display: `inline-block`
			}
			, modelName: {
				margin: 0
			}
			, nameInput: {
				height: `1.4em`
				, padding: 2
				, borderRadius: 4
				, border: `1px solid ${ colors.gray }`
			}
			, mvpLabel: {
				marginRight: 5
			}
			, wrapper: {
				  width: 500
				, height: 500
				, overflow: `scroll`
			}
		};
	}
}

export default connect( state => ( { modelProps: state.modelProps, modal: state.modal } ) )( Radium( ModelModal ) );