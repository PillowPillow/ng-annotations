import {inject} from './inject';

describe('decorator:inject', () => {

	it('should add a static property "$inject" to the given class', () => {

		let TargetClass = injectToClassHelper();

		expect(TargetClass.$inject).toBeDefined();

	});

	it('should add an array "$inject" containing 3 elements', () => {

		let TargetClass = injectToClassHelper(1, 2, 3);
		expect(TargetClass.$inject).toBeDefined();
		expect(TargetClass.$inject instanceof Array).toBeTruthy();
		expect(TargetClass.$inject.length).toBe(3);

	});
	it('should add an array "$inject" containing 3 elements', () => {

		let TargetClass = injectToClassHelper([1, 2, 3]);
		expect(TargetClass.$inject).toBeDefined();
		expect(TargetClass.$inject instanceof Array).toBeTruthy();
		expect(TargetClass.$inject.length).toBe(3);

	});

	it('should add a property to the given object definition', () => {

		let instance = new (injectToMethodHelper())();

		expect(instance.method.$inject).toBeDefined();

	});

	function injectToClassHelper(...params) {
		@inject(...params)
		class Target {
		}
		return Target;
	}

	function injectToMethodHelper(...params) {
		class Class {
			@inject(...params)
			method() {};
		}
		return Class;
	}


});
