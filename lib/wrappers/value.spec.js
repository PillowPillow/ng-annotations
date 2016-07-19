import {NgValue} from './value';
import {NG_ELEMENTS} from '../constants/enums';

describe('wrapper:value', () => {

	it('should return a new value structure', () => {

		let value = NgValue('name', '');
		expect(value.$name).toBeDefined();
		expect(value.$type).toBeDefined();
		expect(value.$component).toBeDefined();
		expect(value.$name).toEqual('name');
		expect(value.$type).toEqual(NG_ELEMENTS.value);

	});

});
