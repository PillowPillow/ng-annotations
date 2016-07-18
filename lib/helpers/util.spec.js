import {arrayUnique, uuid} from './util';

describe('helper:arrayUnique', () => {

	var array = null,
		objRef = {};

	beforeEach(() => {
		objRef = {};
		array = [1, 2, 3, 1, 'test', 'test2', 'test', objRef, objRef];
	});

	it('should return a new array', () => {

		let newArray = arrayUnique(array);
		expect(newArray).toBeDefined();
		expect(newArray instanceof Array).toBeTruthy();
		expect(newArray === array).toBeFalsy()

	});

	it('should remove the duplicate elements from the given array', () => {

		let noDuplicateArray = arrayUnique(array);
		for(let element of [1, 2, 3, 'test', 'test2', objRef])
			expect(noDuplicateArray.filter((arrEl) => arrEl === element).length).toEqual(1);

	});


});

describe('helper:getUUID', () => {

	it('should return a new uuid', () => {

		let id = uuid();
		expect(id).toBeDefined();
		expect(id).toMatch(/^\w{8}-\w{4}-4\w{3}-\w{4}-\w{12}$/);

	});

});