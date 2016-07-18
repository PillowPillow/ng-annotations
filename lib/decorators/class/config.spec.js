import {NgConfig} from './config';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:config', () => {

	it('should return a new config structure', () => {

		let config = generateConfig();
		expect(config.$name).toBeDefined();
		expect(config.$type).toBeDefined();
		expect(config.$component).toBeDefined();
		expect(config.$name).toEqual(null);
		expect(config.$type).toEqual(NG_ELEMENTS.config);

	});

	function generateConfig(...options) {
		@NgConfig(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
