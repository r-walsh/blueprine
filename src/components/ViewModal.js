import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import Select from 'react-select';

import { addButtonStyle, textInput, textArea, label } from '../constants/styles';

import BlueprintSrvc from '../services/blueprintSrvc';

class ViewModal extends PureComponent {
	constructor( props ) {
		super( props );

		if ( this.props.view.size === 0 ) {
			this.state = {
				name: ``
				, mvp: false
				, description: ``
				, endpoints: []
				, features: []
				, existing: false
			};
		} else {
			this.state = {
				name: this.props.view.get( `name` )
				, mvp: this.props.view.get( `mvp` )
				, description: this.props.view.get( `description` )
				, endpoints: this.props.view.get( `endpoints` ).toJS().map( endpoint => endpoint._id )
				, features: this.props.view.get( `features` ).toJS().map( feature => feature._id )
				, viewId: this.props.view.get( `_id` )
				, existing: true
			};
		}
	}

	saveView() {
		if ( this.state.name && this.state.description ) {
			const view = {
				name: this.state.name
				, mvp: this.state.mvp
				, description: this.state.description
				, features: this.state.features
				, endpoints: this.state.endpoints
			};

			if ( !this.state.existing ) {
				return BlueprintSrvc.postItem( view, this.props.blueprint, `views` );
			}

			view._id = this.state.viewId;
			return BlueprintSrvc.updateFeature( view, this.props.blueprint, `views` );
		}
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	handleCheckChange( event ) {
		this.setState( { mvp: event.target.checked } );
	}

	handleSelectChange( field, val ) {
		this.setState( { [ field ]: val.map( selectReturn => selectReturn.value ) } );
	}

	render() {
		const endpointOptions = this.props.blueprint.endpoints.map( endpoint => ( { value: endpoint._id, label: endpoint.name } ) );
		const featureOptions = this.props.blueprint.features.map( feature => ( { value: feature._id, label: feature.name } ) );

		return (
			<div>
				<label style={ label }>View Name</label>
				<input
					onChange={ this.handleChange.bind( this, `name` ) }
					style={ textInput }
					type="text"
					value={ this.state.name }
				/>

				<label style={ label }>Description</label>
				<textarea
					cols="30"
					key="viewDescription"
					onChange={ this.handleChange.bind( this, `description` ) }
					rows="10"
					style={ textArea }
					value={ this.state.description }
				/>

				<label style={ label }>MVP?</label>
				<input
					checked={ this.state.mvp }
					onChange={ this.handleCheckChange.bind( this ) }
					type="checkbox"
				/>

				<Select
					multi
					name="featureOptions"
					onChange={ this.handleSelectChange.bind( this, `features` ) }
					options={ featureOptions }
					placeholder="Features"
					value={ this.state.features }
				/>

				<Select
					multi
					name="endpointOptions"
					onChange={ this.handleSelectChange.bind( this, `endpoints` ) }
					options={ endpointOptions }
					placeholder="Endpoints"
					value={ this.state.endpoints }
				/>

				<button
					key="saveView"
					onClick={ this.saveView.bind( this ) }
					style={ addButtonStyle }
				>
					Save
				</button>
			</div>
		);
	}
}

export default Radium( ViewModal );