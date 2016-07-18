import {NgAnimation} from './animation';
import {NG_ELEMENTS} from '../../constants/enums';

describe('decorator:animation', () => {

	it('should return a new animation structure', () => {

		let animation = generateAnimation();
		expect(animation.$name).toBeDefined();
		expect(animation.$type).toBeDefined();
		expect(animation.$component).toBeDefined();
		expect(animation.$name).toEqual('Target');
		expect(animation.$type).toEqual(NG_ELEMENTS.animation);

	});

	it('should return a animation with a custom name', () => {
		let name = 'custom_name',
			animation = generateAnimation(name);
		expect(animation.$name).toEqual(name);

	});

	function generateAnimation(...options) {
		@NgAnimation(...options)
		class Target {
			prop1 = 1;

			method() {}
		}
		return Target;
	}
});
