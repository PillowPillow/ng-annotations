import {NgService} from './service';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:service', () => {

	it('should return a new service structure', () => {

		let service = generateService();
		expect(service.$name).toBeDefined();
		expect(service.$type).toBeDefined();
		expect(service.$component).toBeDefined();
		expect(service.$name).toEqual('Target');
		expect(service.$type).toEqual(NG_ELEMENTS.service);

	});

	it('should return a service with a custom name', () => {
		let name = 'custom_name',
			service = generateService(name);
		expect(service.$name).toEqual(name);

	});

	function generateService(...options) {
		@NgService(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
