import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

import { colors } from '../constants/styles';

class BlueprintRecent extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div style={ styles.wrapper } className="blueprint-wrapper">
				<h2 style={ styles.title }>{ this.props.title }</h2>
				<p><span style={ styles.completion }>Completion</span>: { 85 }%</p>
				<p><span style={ styles.completion }>Description: </span>{ this.props.description }</p>
			</div>
		)
	}

	getStyles() {
		return {
			  wrapper: {
				  width: `80%`
				, height: window.innerHeight / 3
				, margin: `15px auto`
				, border: `2px solid ${ colors.blue }`
				, borderRadius: 2
				, padding: 10
				, color: colors.deepBlue
			}
			, title: {
				  textAlign: `center`
				, textDecoration: `underline`
			}
			, completion: {
				fontWeight: `bold`
			}
		}
	}
}

export default Radium( BlueprintRecent );