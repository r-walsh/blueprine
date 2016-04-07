import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class FeatureModal extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<h1>FEATURE</h1>
		)
	}
}

export default Radium( FeatureModal );