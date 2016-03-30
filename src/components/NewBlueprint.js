import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from "../constants/styles";

class NewBlueprint extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div className="new-blueprint-wrapper">
				<div style={ styles.inputWrapper } className="input-wrapper">
					<label style={ styles.label }>Project Title</label>
					<input style={ styles.input } type="text"/>
				</div>

				<div style={ styles.inputWrapper } className="input-wrapper">
					<label style={ styles.label }>Description</label>
					<textarea style={ styles.textArea } rows="10" />
				</div>

				<button style={ styles.button }>Create!</button>
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