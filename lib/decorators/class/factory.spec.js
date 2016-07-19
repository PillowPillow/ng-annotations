import {NgFactory} from './factory';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:factory', () => {

	it('should return a new factory structure', () => {

		let factory = generateFactory();
		expect(factory.$name).toBeDefined();
		expect(factory.$type).toBeDefined();
		expect(factory.$component).toBeDefined();
		expect(factory.$name).toEqual('Target');
		expect(factory.$type).toEqual(NG_ELEMENTS.factory);

	});

	it('should return a factory with a custom name', () => {
		let name = 'custom_name',
			factory = generateFactory(name);
		expect(factory.$name).toEqual(name);

	});

	function generateFactory(...options) {
		@NgFactory(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
