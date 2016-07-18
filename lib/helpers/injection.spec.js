import {injectTo} from './injection';


describe('injectTo', () => {

	var TargetClass = null;

	beforeEach(() => {
		TargetClass = class Target { method() {} };
	});

	it('should add a property to the given class', () => {

		injectTo('property', [])(TargetClass);

		expect(TargetClass.property).toBeDefined();

	});

	it('should add a property to the given object definition', () => {

		let definition = {value: () => {}};

		injectTo('property', [])(TargetClass, 'method', definition);

		expect(definition.value.property).toBeDefined();
	});

	it('should add an array of three elements to the given class', () => {

		injectTo('property', [1, 2, 3])(TargetClass);

		expect(TargetClass.property instanceof Array).toBeTruthy();
		expect(TargetClass.property.length).toBe(3);

	});

	it('should define a new method if the property definition is missing', () => {

		injectTo('property', [])(TargetClass, 'method');

		let instance = new TargetClass();

		expect(instance.method).toBeDefined();

	});

});

