import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { browserHistory } from 'react-router';

import store from '../store';
import { toggleBlueprintModal } from '../ducks/modal';
import { addBlueprint } from '../ducks/blueprint';
import blueprintSrvc from '../services/blueprintSrvc';

import { colors } from "../constants/styles";

const initialState = {
	  title: ``
	, description: ``
	, errors: ``
};

class NewBlueprint extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = initialState;
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	postBlueprint( title, description ) {
		if ( !title || !description ) {
			return this.setState({ errors: `All fields required`});
		}

		let dfd = new Promise( ( resolve, reject ) => {
			blueprintSrvc.postBlueprint( { title, description }, resolve, reject );
		});

		dfd.then( res => {
			this.setState( initialState );
			store.dispatch( toggleBlueprintModal( false ) );
			store.dispatch( addBlueprint( res ));
			return browserHistory.push(`/blueprints/${ res._id }`)
		})
		.catch( err => {
			this.setState({ errors: err });
		});
	}

	render() {
		const styles = this.getStyles();

		return (
			<div className="new-blueprint-wrapper">
				<div style={ styles.inputWrapper } className="input-wrapper">
					<label style={ styles.label }>Project Title</label>
					<input value={ this.state.title }
						   onChange={ this.handleChange.bind( this, `title`) }
						   style={ styles.input }
						   type="text"/>
				</div>

				<div style={ styles.inputWrapper } className="input-wrapper">
					<label style={ styles.label }>Description</label>
					<textarea value={ this.state.description }
							  onChange={ this.handleChange.bind( this, `description` ) }
							  style={ styles.textArea }
							  rows="10" />
				</div>

				<button onClick={ this.postBlueprint.bind( this, this.state.title, this.state.description ) } style={ styles.button }>Create!</button>
			</div>
		);
	}

	getStyles() {
		return {
			inputWrapper: {
				  margin: 10
				, width: 300
			}
			, label: {
				  fontSize: `1.1em`
				, fontWeight: `bold`
			}
			, input: {
				  width: `100%`
				, border: `1px solid ${ colors.gray }`
				, height: 25
				, borderRadius: 2
			}
			, textArea: {
				  resize: `none`
				, display: `block`
				, width: `100%`
				, borderColor: colors.gray
				, borderRadius: 2
			}
			, button: {
				  float: `right`
				, backgroundColor: colors.lightBlue
				, color: colors.white
				, padding: `4px 10px`
				, border: `none`
				, outline: `1px solid #3bd4d7`
				, display: `block`
				, margin: `0 5px`
				, ':hover': {
					outline: `2px solid #3bd4d7`
				}
			}
		}
	}
}

export default Radium( NewBlueprint );