import {NgConstant} from './constant';
import {NG_ELEMENTS} from '../constants/enums';

describe('wrapper:constant', () => {

	it('should return a new constant structure', () => {

		let constant = NgConstant('name', 'value');
		expect(constant.$name).toBeDefined();
		expect(constant.$type).toBeDefined();
		expect(constant.$component).toBeDefined();
		expect(constant.$name).toEqual('name');
		expect(constant.$type).toEqual(NG_ELEMENTS.constant);

	});

});
