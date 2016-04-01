import request from 'superagent';
import { browserHistory } from 'react-router';

import store from '../store';
import { setUser, setErrors } from '../ducks/auth';

export default class LoginSrvc {

	static validateForm( email, password ) {
		let emailRegex = new RegExp(/\S+@\S+\.\S+/);
		let errors = [];

		if ( !email || !emailRegex.test(email) ) {
			errors.push(`Invalid Email`);
		}

		if ( password.length === 0 ) {
			errors.push(`Password Required`);
		}

		if ( errors.length === 0 ) {
			return this.getUser( email, password );
		}

		store.dispatch( setErrors(errors) );
	}
	
	static getUser( email, password ) {
		request.post(`/api/login`)
				.send({ email, password })
				.end(( err, res ) => {
					if ( err ) {
						return store.dispatch( setErrors( [err] ) );
					}

					if ( res.body.authenticated ) {
						store.dispatch( setUser( res.body.user ) );
						return browserHistory.push(`/blueprints`);
					} else {
						return store.dispatch( setErrors([`Unknown Error Logging in, please try again`] ) );
					}
				});
	}
}