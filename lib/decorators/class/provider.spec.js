import {NgProvider} from './provider';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:provider', () => {

	it('should return a new provider structure', () => {

		let provider = generateProvider();
		expect(provider.$name).toBeDefined();
		expect(provider.$type).toBeDefined();
		expect(provider.$component).toBeDefined();
		expect(provider.$name).toEqual('Target');
		expect(provider.$type).toEqual(NG_ELEMENTS.provider);

	});

	it('should return a provider with a custom name', () => {
		let name = 'custom_name',
			provider = generateProvider(name);
		expect(provider.$name).toEqual(name);

	});

	function generateProvider(...options) {
		@NgProvider(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
