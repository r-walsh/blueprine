import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';

class Settings extends PureComponent {
	render() {
		return (
			<h1>HALLO</h1>
		);
	}
}

export default connect( state => ( { user: state.auth } ) )( Radium( Settings ) );