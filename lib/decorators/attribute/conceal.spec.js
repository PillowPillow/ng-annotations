import {conceal,} from './conceal';
import {STRUCT_KEYS} from '../../constants/enums';
import {getIdentifier} from '../../helpers/identifier';

describe('decorator:conceal', () => {

	var TargetClass = null;

	beforeEach(() => {
		TargetClass = class Target {
			@conceal
			prop = null;
		};
	});

	it('should add the given field to the private properties', () => {
		let privateKey = getIdentifier(STRUCT_KEYS.private);

		expect(TargetClass.prototype[privateKey]).toBeDefined();
		expect(TargetClass.prototype[privateKey]).toContain('prop');

	});

});