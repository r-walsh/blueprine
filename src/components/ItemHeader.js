import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from '../constants/styles';

class ItemHeader extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.header }>
				<h3 style={ styles.titleText }>{ this.props.itemName }</h3>
			</div>
		);
	}

	getStyles() {
		return {
			header: {
				  width: `100%`
				, height: 25
				, textAlign: `center`
				, borderBottom: `2px solid ${ colors.gray }`
				, borderTop: `2px solid ${ colors.gray }`
			}
			, titleText: {
				margin: `5px auto`
			}
		}
	}
}

export default Radium( ItemHeader )