import {NgDecorator} from './decorator';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {getIdentifier} from '../../helpers/identifier';

describe('decorator:decorator', () => {

	var decorator = null;

	beforeEach(() => {
		decorator = generateDecorator();
	});

	it('should return a new config structure', () => {

		expect(decorator.$name).toBeDefined();
		expect(decorator.$type).toBeDefined();
		expect(decorator.$component).toBeDefined();
		expect(decorator.$name).toEqual(null);
		expect(decorator.$type).toEqual(NG_ELEMENTS.config);

	});

	it('should add an identifier "$inject" to the core component', () => {

		expect(decorator[STRUCT_KEYS.component][getIdentifier(STRUCT_KEYS.inject)]).toBeDefined();

	});

	it('should add "$provide" to the post injections', () => {

		let postInjections = decorator[STRUCT_KEYS.component][getIdentifier(STRUCT_KEYS.inject)];
		expect(postInjections).toContain('$provide');

	});

	function generateDecorator() {
		@NgDecorator()
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
