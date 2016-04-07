import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class ModelModal extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<h1>MODEL</h1>
		)
	}
}

export default Radium( ModelModal );