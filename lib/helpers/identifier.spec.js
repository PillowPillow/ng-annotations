import {getIdentifier} from './identifier';

describe('helper:getIdentifier', () => {

	var key = 0;

	beforeEach(() => {
		key++;
	});

	it('should return a new identifier', () => {

		let identifier = getIdentifier(key);
		expect(identifier).toBeDefined();

	});

	it('should return a the same identifier', () => {

		let identifier1 = getIdentifier(key),
			identifier2 = getIdentifier(key);
		expect(identifier1).toEqual(identifier2);

	});

});