import request from 'superagent';
import { browserHistory } from 'react-router';

import store from '../store';
import { setUser, setErrors } from '../ducks/auth';

export default class LoginSrvc {

	static validateForm( email, password, signup = false ) {
		const emailRegex = new RegExp( /\S+@\S+\.\S+/ );
		const errors = [];

		if ( !email || !emailRegex.test( email ) ) {
			errors.push( `Invalid Email` );
		}

		if ( password.length === 0 ) {
			errors.push( `Password Required` );
		}

		if ( errors.length === 0 && !signup ) {
			return this.getUser( email, password );
		}

		if ( errors.length === 0 && signup ) {
			return this.signup( email, password );
		}

		return store.dispatch( setErrors( errors ) );
	}

	static getUser( email, password ) {
		request.post( `/api/login` )
				.send( { email, password } )
				.end( ( err, res ) => {
					if ( err ) {
						return store.dispatch( setErrors( [err] ) );
					}

					if ( res.body.authenticated ) {
						store.dispatch( setUser( res.body.user ) );
						return browserHistory.push( `/blueprints` );
					}

					return store.dispatch( setErrors( [ `Unknown Error Logging in, please try again` ] ) );
				} );
	}

	static signup( email, password ) {
		request.post( `/api/signup` )
				.send( { email, password } )
				.end( ( err, res ) => {
					if ( err ) {
						return store.dispatch( setErrors( [err] ) );
					}

					if ( res.body.authenticated ) {
						store.dispatch( setUser( res.body.user ) );
						return browserHistory.push( `/blueprints` );
					}

					return store.dispatch( setErrors( [ `Unknown Error Logging in, please try again` ] ) );
				});
	}

	static verifyAuth( callback, ...args ) {
		return request.get( `/api/verify-auth`, ( err, res ) => {
			if ( err ) {
				return browserHistory.push( `/login` );
			}

			if ( callback ) {
				callback( ...args );
			}
			store.dispatch( setUser( res.body ) );
		} );
	}
}