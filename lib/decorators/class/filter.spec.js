import {NgFilter} from './filter';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:filter', () => {

	it('should return a new filter structure', () => {

		let filter = generateFilter();
		expect(filter.$name).toBeDefined();
		expect(filter.$type).toBeDefined();
		expect(filter.$component).toBeDefined();
		expect(filter.$name).toEqual('Target');
		expect(filter.$type).toEqual(NG_ELEMENTS.filter);

	});

	it('should return a filter with a custom name', () => {
		let name = 'custom_name',
			filter = generateFilter(name);
		expect(filter.$name).toEqual(name);

	});

	function generateFilter(...options) {
		@NgFilter(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
