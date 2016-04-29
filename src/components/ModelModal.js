import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import { addButtonStyle, colors } from '../constants/styles';

import store from '../store';
import { toggleEditModelPropertyModal } from '../ducks/modal';
import { setProps } from '../ducks/modelProps';
import BlueprintSrvc from '../services/blueprintSrvc';

import ModelProp from './ModelProp';
import PropListItem from './PropListItem';

class ModelModal extends PureComponent {
	constructor( props ) {
		super( props );

		if ( this.props.model.size === 0 ) {
			this.state = {
				name: ``
				, mvp: false
				, complete: false
				, editModelName: true
				, existing: false
			};
		} else {
			this.state = {
				name: this.props.model.get( `name` )
				, mvp: this.props.model.get( `mvp` )
				, modelId: this.props.model.get( `_id` )
				, editModelName: false
				, complete: this.props.model.get( `complete` )
				, existing: true
			};
		}
	}

	componentWillMount() {
		if ( this.props.model.get( `model` ) !== undefined ) {
			return store.dispatch( setProps( this.props.model.get( `model` ).toJS() ) );
		}
		return store.dispatch( setProps( [] ) );
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	handleCheckChange( event ) {
		this.setState( { mvp: event.target.checked } );
	}

	editName() {
		this.setState( { editModelName: true } );
	}

	saveName() {
		if ( this.state.name ) {
			this.setState( { editModelName: false } );
		}
	}

	saveModel() {
		if ( this.state.name ) {
			const model = {
				name: this.state.name
				, mvp: this.state.mvp
				, complete: this.state.complete
				, model: this.props.modelProps.toJS()
			};

			if ( !this.state.existing ) {
				return BlueprintSrvc.postItem( model, this.props.blueprint, `models` );
			}

			model._id = this.state.modelId;
			return BlueprintSrvc.updateFeature( model, this.props.blueprint, `models` );
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
		const propListItems = this.props.modelProps.toJS()
								.map( modelProp => (
									<PropListItem key={ modelProp.propName } { ...modelProp } />
								) );

		return (
			<div style={ styles.wrapper }>
				{ this.props.modal.getIn( [ `editModelPropertyModal`, `toggled` ] ) &&
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
								style={ [ addButtonStyle, styles.editNameButton ] }
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
					checked={ this.state.mvp }
					id="model-mvp"
					onChange={ this.handleCheckChange.bind( this ) }
					type="checkbox"
				/>
				<button
					onClick={ this.editProperty.bind( this ) }
					style={ [ addButtonStyle, styles.addPropertyButton ] }
				>
					Add Property
				</button>

				<div>
					{ propListItems }
				</div>

				<button
					key="saveModel"
					onClick={ this.saveModel.bind( this ) }
					style={ [ addButtonStyle, styles.addPropertyButton ] }
				>
					Save
				</button>
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