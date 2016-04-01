import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from '../constants/styles';

class BlueprintThumbnail extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper } className="thumbnail-wrapper">
				<h4 style={ styles.title }>{ this.props.title }</h4>
				<p style={ styles.description }>{ this.props.description }</p>
			</div>
		);
	}

	getStyles() {
		return {
			wrapper: {
				  borderBottom: `1px solid ${ colors.gray }`
				, width: `95%`
				, height: 75
				, overflow: `hidden`
			}
			, title: {
				  textAlign: `center`
				, marginTop: 7
			}
			, description: {
				  fontSize: `.8em`
				, marginLeft: 5
			}
		}
	}
}

export default Radium( BlueprintThumbnail );