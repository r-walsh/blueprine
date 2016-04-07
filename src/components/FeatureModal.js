import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { addButtonStyle } from '../constants/styles';

import BlueprintSrvc from '../services/blueprintSrvc';

class FeatureModal extends PureComponent {
	constructor( props ) {
		super( props );

		this.state = {
			  featureName: ``
			, feature: ``
			, mvp: false
		}
	}
	
	saveFeature() {
		if ( this.state.featureName && this.state.feature ) {
			BlueprintSrvc.postFeature({
				  feature: this.state.feature
				, name: this.state.featureName
				, mvp: this.state.mvp
			}, this.props.blueprint );
		}
	}

	handleChange( field, event ) {
		this.setState({ [field]: event.target.value });
	}

	handleCheckChange() {
		this.setState({ mvp: !this.state.mvp })
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				<label style={ [styles.label, styles.labelFirst] }>
					Feature name:
				</label>
				<input style={ [styles.textInput, styles.textBorders] }
					   value={ this.state.featureName }
					   onChange={ this.handleChange.bind( this, `featureName` ) }
					   key="featureName"
					   type="text"/>

				<label style={ styles.label }>
					Feature:
				</label>
				<textarea rows="4"
						  key="feature"
						  value={ this.state.feature }
						  onChange={ this.handleChange.bind( this, `feature` ) }
						  style={ [styles.textArea, styles.textBorders] } />

				<label style={ styles.label } htmlFor="mvp">MVP?</label>
				<input id="mvp"
					   name="mvp"
					   type="checkbox"
					   value={ this.state.mvp }
					   onChange={ this.handleCheckChange.bind( this ) } />

				<button style={ [addButtonStyle, styles.saveButton] }
						onClick={ this.saveFeature.bind( this ) }>
					Save Feature
				</button>
			</div>
		)
	}

	getStyles() {
		return {
			wrapper: {
				width: 350
			}
			, label: {
				  display: `inline-block`
				, margin: `10px 7px 3px 0`
			}
			, labelFirst: {
				margin: `0 7px 3px 0`
			}
			, textInput: {
				  display: `block`
				, width: `100%`
				, height: `1.4em`
			}
			, textArea: {
				  resize: `none`
				, display: `block`
				, width: `100%`
			}
			, saveButton: {
				  margin: `12px 0 0 0`
				, display: `block`
			}
			, textBorders: {
				  border: `1px solid black`
				, borderRadius: 3
				, ':focus': {
					outlineWidth: 2
				}
			}
		}
	}
}

export default Radium( FeatureModal );