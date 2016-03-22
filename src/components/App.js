import React from 'react';
import PureComponent from '../../node_modules/react-pure-render/component';
import { StyleRoot } from 'radium';

import NavBar from './NavBar';

export default class App extends PureComponent {
	render() {
		return (
			<StyleRoot>
				<NavBar />
				{ this.props.children }
			</StyleRoot>
		);
	}
}