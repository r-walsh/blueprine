import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

class EditBlueprint extends PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<h3>Hallo</h3>
		);
	}
}

export default Radium( EditBlueprint );