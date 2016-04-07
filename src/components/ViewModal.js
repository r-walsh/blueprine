import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class ViewModal extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<h1>VIEW</h1>
		)
	}
}

export default Radium( ViewModal );