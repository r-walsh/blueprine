import chai from 'chai';
import { describe, it } from 'mocha';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

const { expect } = chai;

import authDuck, { setUser, logout } from '../../src/ducks/auth';

const initialState = Map({
	  loggedIn: false
	, user: Map({
		_id: null
	})
});

describe(`setUser`, () => {
	it(`should return an object with the correct action type and an immutable map of user`, () => {
		expect( setUser( { _id: 1 } ) ).to.eql({
			  type: `user/SET_USER`
			, user: Map({
				_id: 1
			})
		});
	});
});

describe(`logout`, () => {
	it(`should return an object with the correct action`, () => {
		expect( logout() ).to.eql({ type: `user/LOGOUT` });
	});
});

describe(`authDuck`, () => {
	it(`has an initial state`, () => {
		expect(authDuck( undefined, setUser( { _id: 1 } ))).to.eql(Map({
			  loggedIn: true
			, user: Map({
				_id: 1
			})
		}));
	});

	it(`does not mutate state`, () => {
		expect(authDuck( initialState, setUser( { _id: 1} ) )).to.eql(Map({
			  loggedIn: true
			, user: Map({
				_id: 1
			})
		}));
		expect(initialState).to.eql(Map({
			  loggedIn: false
			, user: Map({
				_id: null
			})
		}))
	});

	it(`handles SET_USER`, () => {
		expect(authDuck( initialState, setUser( { _id: 1 } ))).to.eql(Map({
			loggedIn: true
			, user: Map({
				_id: 1
			})
		}));
	});

	it(`handles LOGOUT`, () => {
		const state = Map({
			  loggedIn: true
			, user: Map({
				_id: 142452324
			})
		});

		expect(authDuck( state, logout() )).to.eql( initialState );
	});
});