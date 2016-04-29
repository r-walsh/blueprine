import React from 'react';
import PureComponent from 'react-pure-render/component';
import { StyleRoot } from 'radium';

import { colors } from '../constants/styles';

import NavBar from './NavBar';

export default class App extends PureComponent {
	render() {
		const styles = this.getStyles();

		return (
			<div
				className="main-wrapper"
				style={ styles.mainWrapper }
			>
				<StyleRoot>
					<NavBar />
					{ this.props.children }
				</StyleRoot>
			</div>
		);
	}

	getStyles() {
		return {
			mainWrapper: {
				  width: `100%`
				, backgroundColor: colors.white
			}
		};
	}
}