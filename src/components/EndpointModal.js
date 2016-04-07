import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class EndpointModal extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<h1>ENDPOINT</h1>
		)
	}
}

export default Radium( EndpointModal );