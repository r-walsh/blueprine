import React from 'react';
import PureComponent from 'react-pure-render/component';
import Radium from 'radium';
import { connect } from 'react-redux';

import store from '../store';
import { setUser } from '../ducks/auth';

import { colors } from '../constants/styles';

class Login extends PureComponent {
	constructor( props ) {
		super(props);

		this.state = {
			  email: ``
			, password: ``
		}
	}

	handleChange( type, event ) {
		this.setState({ [ type ]: event.target.value });
	}

	login() {
		if ( this.validateForm() ) {
			store.dispatch( setUser({ user: { _id: 1 } }));
		}
	}

	validateForm() {
		let emailRegex = new RegExp(/\S+@\S+\.\S+/);

		return ( emailRegex.test(this.state.email) && this.state.password.length > 0 );
	}

	render() {
		const styles = this.getStyles();

		return (
			<div className="login-wrapper"
				 style={ styles.loginWrapper }>

					<div style={ styles.inputWrapper } className="input-wrapper">
						<label style={ styles.labels }>Email</label>
						<input style={ styles.inputs }
							   onChange={ this.handleChange.bind(this, `email`) }
							   value={ this.state.email }
							   key="email"
							   type="email"/>
					</div>
					<div style={ styles.inputWrapper } className="input-wrapper">
						<label style={ styles.labels }>Password</label>
						<input style={ styles.inputs }
							   onChange={ this.handleChange.bind(this, `password`) }
							   value={ this.state.password }
							   key="password"
							   type="password"/>
					</div>
					<button style={ styles.button }
							onClick={ this.login.bind(this) }>
						Login
					</button>

			</div>
		);

	}

	getStyles() {
		return {
			  loginWrapper: {
				  width: 400
				, margin: `80px auto`
			}
			, inputWrapper: {
				  width: `90%`
				, margin: `10px auto`
			}
			, inputs: {
				  width: `100%`
				, height: `1.6em`
				, marginTop: 3
				, borderRadius: 3
				, border: `1px solid grey`
				, ':focus': {
					outlineWidth: 2
				}
			}
			, labels: {
				fontSize: `.95em`
			}
			, button: {
				  margin: `7px 20px`
				, backgroundColor: colors.blue
				, color: colors.white
				, border: `none`
				, borderRadius: 2
				, padding: `8px 25px`
				, ':hover': {
					backgroundColor: colors.lightBlue
				}
			}
		};
	}
}

export default connect( state => ({ user: state.user }))( Radium(Login) );

// export default Radium(Login);