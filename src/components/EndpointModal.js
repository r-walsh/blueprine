import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { addButtonStyle } from '../constants/styles';

import BlueprintSrvc from '../services/blueprintSrvc';

class EndpointModal extends PureComponent {
	constructor( props ) {
		super( props );

		if ( this.props.endpoint.size === 0 ) {
			this.state = {
				name: ``
				, url: ``
				, mvp: false
				, description: ``
				, model: ``
				, existing: false
			};
		} else {
			this.state = {
				name: this.props.endpoint.get( `name` )
				, url: this.props.endpoint.get( `url` )
				, mvp: this.props.endpoint.get( `mvp` )
				, description: this.props.endpoint.get( `description` )
				, model: this.props.endpoint.get( `model` )
				, endpointId: this.props.endpoint.get( `_id` )
				, existing: true
			};
		}
	}

	saveEndpoint() {
		if ( this.state.name && this.state.description && this.state.url && this.state.model ) {
			const endpoint = {
				name: this.state.name
				, url: this.state.url
				, mvp: this.state.mvp
				, description: this.state.description
				, model: this.state.model
			};

			if ( !this.state.existing ) {
				return BlueprintSrvc.postItem( endpoint, this.props.blueprint, `endpoints` );
			}

			endpoint._id = this.state.endpointId;
			return BlueprintSrvc.updateFeature( endpoint, this.props.blueprint, `endpoints` );
		}
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	handleCheckChange( event ) {
		this.setState( { mvp: event.target.checked } );
	}

	render() {
		const modelOptions = this.props.blueprint.models.map( model => <option key={ model._id } value={ model._id }>{ model.name }</option> );
		modelOptions.unshift( <option value="" key="initialVal" /> );

		return (
			<div>
				<label>Endpoint Name</label>
				<input
					onChange={ this.handleChange.bind( this, `name` ) }
					type="text"
					value={ this.state.name }
				/>

				<label>URL</label>
				<input
					onChange={ this.handleChange.bind( this, `url` ) }
					type="text"
					value={ this.state.url }
				/>

				<label>Model</label>
				<select
					onChange={ this.handleChange.bind( this, `model` ) }
					value={ this.state.model }
				>
					{ modelOptions }
				</select>

				<label>Description</label>
				<textarea
					cols="30"
					onChange={ this.handleChange.bind( this, `description` ) }
					rows="10"
					value={ this.state.description }
				/>

				<label>MVP?</label>
				<input
					checked={ this.state.mvp }
					onChange={ this.handleCheckChange.bind( this ) }
					type="checkbox"
				/>

				<button
					onClick={ this.saveEndpoint.bind( this ) }
					style={ addButtonStyle }
				>
					Save
				</button>
			</div>
		);
	}
}

export default Radium( EndpointModal );