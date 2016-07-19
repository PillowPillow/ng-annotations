import {NgDirective} from './directive';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {getIdentifier} from '../../helpers/identifier';

describe('decorator:directive', () => {

	var directive = null;

	beforeEach(() => {
		directive = generateDirective();
	});

	it('should return a new directive structure', () => {

		expect(directive.$name).toBeDefined();
		expect(directive.$type).toBeDefined();
		expect(directive.$component).toBeDefined();
		expect(directive.$name).toEqual('Target');
		expect(directive.$type).toEqual(NG_ELEMENTS.directive);

	});

	it('should return a directive with a custom name', () => {
		let name = 'custom_name',
			directive = generateDirective(name);
		expect(directive.$name).toEqual(name);

	});

	function generateDirective(...options) {
		@NgDirective(...options)
		class Target {
			link() {}
		}
		return Target;
	}
});
