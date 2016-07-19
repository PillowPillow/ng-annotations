import {NgRun} from './run';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:run', () => {

	it('should return a new run structure', () => {

		let run = generateRun();
		expect(run.$name).toBeDefined();
		expect(run.$type).toBeDefined();
		expect(run.$component).toBeDefined();
		expect(run.$name).toEqual(null);
		expect(run.$type).toEqual(NG_ELEMENTS.run);

	});

	function generateRun(...options) {
		@NgRun(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
