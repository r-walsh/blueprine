import chai from 'chai';
import { describe, it } from 'mocha';
import { Map, List } from 'immutable';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

const { expect } = chai;

import blueprintDuck, { setBlueprints, addBlueprint, selectBlueprint } from '../../src/ducks/blueprint';

const initialState = Map({
	ownedBlueprints: List()
	, sharedBlueprints: List()
	, selectedBlueprint: Map()
});

describe( `blueprintDuck`, () => {

	

});