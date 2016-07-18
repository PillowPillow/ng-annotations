import {NgController} from './controller';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:controller', () => {

	it('should return a new controller structure', () => {

		let controller = generateController();
		expect(controller.$name).toBeDefined();
		expect(controller.$type).toBeDefined();
		expect(controller.$component).toBeDefined();
		expect(controller.$name).toEqual('Target');
		expect(controller.$type).toEqual(NG_ELEMENTS.controller);

	});

	it('should return a controller with a custom name', () => {
		let name = 'custom_name',
			controller = generateController(name);
		expect(controller.$name).toEqual(name);

	});

	function generateController(...options) {
		@NgController(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
