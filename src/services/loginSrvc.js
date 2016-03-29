import request from 'superagent';

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
			return this.getUser( email );
		}

		store.dispatch( setErrors(errors) );
	}
	
	static getUser( email ) {
		request.get('./assets/users.json', ( err, users ) => {
			let userList = users.body;
			for ( let i = 0; i < userList.length; i++ ) {
				if ( userList[i].email === email ) {
					return store.dispatch( setUser( userList[i]));
				}
			}
			return store.dispatch( setErrors(['User not found'] ));
		});
	}
}