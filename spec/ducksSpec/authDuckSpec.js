import chai from 'chai';
import { describe, it } from 'mocha';
import { Map, List } from 'immutable';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

const { expect } = chai;

import authDuck, { setUser, logout, setErrors } from '../../src/ducks/auth';

const initialState = Map({
	  loggedIn: false
	, user: Map({
		email: null
		, admin: false
		, mentor: false
		, blueprints: List()
		, _id: null
	})
	, errors: List()
});

const testUser = {
	  email: `test@test.com`
	, admin: true
	, mentor: false
	, _id: 1
	, blueprints: List()
};

describe(`setUser`, () => {
	it(`should return an object with the correct action type and an immutable map of user`, () => {
		expect( setUser( testUser ) ).to.eql({
			  type: `user/SET_USER`
			, user: Map({
				  email: `test@test.com`
				, admin: true
				, mentor: false
				, _id: 1
				, blueprints: List()
			})
		});
	});
});

describe(`logout`, () => {
	it(`should return an object with the correct action`, () => {
		expect( logout() ).to.eql({ type: `user/LOGOUT` });
	});
});

describe(`setErrors`, () => {
	it(`returns an object containing an action type and an immutable List of errors`, () => {
		expect( setErrors(['Invalid Email', 'Password Required']) ).to.eql({
			  type: `user/SET_ERRORS`
			, errors: List.of(`Invalid Email`, `Password Required`)
		});
	});
});

describe(`authDuck`, () => {
	it(`has an initial state`, () => {
		expect(authDuck( undefined, setUser( testUser ))).to.eql(Map({
			  loggedIn: true
			, user: Map({
				  email: `test@test.com`
				, admin: true
				, mentor: false
				, _id: 1
				, blueprints: List()
			})
			, errors: List()
		}));
	});

	it(`does not mutate state`, () => {
		expect(authDuck( initialState, setUser( testUser ) )).to.eql(Map({
			  loggedIn: true
			, user: Map({
				  email: `test@test.com`
				, admin: true
				, mentor: false
				, _id: 1
				, blueprints: List()
			})
			, errors: List()
		}));
		expect(initialState).to.eql(Map({
			  loggedIn: false
			, user: Map({
				  email: null
				, admin: false
				, mentor: false
				, _id: null
				, blueprints: List()
			})
			, errors: List()
		}))
	});

	it(`handles SET_USER`, () => {
		expect(authDuck( initialState, setUser( testUser ))).to.eql(Map({
			loggedIn: true
			, user: Map({
				  email: `test@test.com`
				, admin: true
				, mentor: false
				, _id: 1
				, blueprints: List()
			})
			, errors: List()
		}));
	});

	it(`handles LOGOUT`, () => {
		const state = Map({
			  loggedIn: true
			, user: Map({
				  email: `test@test.com`
				, admin: true
				, mentor: false
				, _id: 1
				, blueprints: List()
			})
			, errors: List()
		});

		expect(authDuck( state, logout() )).to.eql( initialState );
	});

	it(`handles SET_ERRORS`, () => {
		expect(authDuck( initialState, setErrors(['Password Required']) )).to.eql(Map({
			  loggedIn: false
			, user: Map({
				  email: null
				, admin: false
				, mentor: false
				, _id: null
				, blueprints: List()
			})
			, errors: List.of(`Password Required`)
		}))
	});
});