import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';

@Radium
export default class Login extends PureComponent {
	render() {
		const styles = this.getStyles();

		return (
			<div className="login-wrapper">
				<h1>TEST</h1>
				<form>
					<input type="text"/>
					<input type="text"/>
				</form>
			</div>
		);

	}

	getStyles() {
		return {

		};
	}
}