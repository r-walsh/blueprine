import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { addButtonStyle } from '../constants/styles';

class FeatureModal extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper }>
				<label style={ [styles.label, styles.labelFirst] }>Feature name:</label>
				<input style={ styles.textInput } type="text"/>

				<label style={ styles.label }>Feature:</label>
				<textarea rows="4" style={ styles.textArea } />

				<label style={ styles.label } htmlFor="mvp">MVP?</label>
				<input id="mvp" name="mvp" type="checkbox"/>

				<button style={ [addButtonStyle, styles.saveButton] }>Save Feature</button>
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
		}
	}
}

export default Radium( FeatureModal );