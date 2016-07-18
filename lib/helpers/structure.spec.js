import {ANGULAR_ELEMENTS} from '../constants/angularElements';
import {STRUCT_KEYS} from '../constants/enums';
import {defineStructure, defineAutodeclareMethod, applyTransformations, getNgStructure} from './structure';
import {getIdentifier} from './identifier';

describe('helper:defineStructure', () => {

	var TargetClass = null,
		name = null,
		type = null,
		component = null;

	beforeEach(() => {
		TargetClass = class Target {
			method() {}
		};
		name = 'Name';
		type = ANGULAR_ELEMENTS[0];
		component = () => {};
	});

	it('should add a property "$name" to the given class', () => {

		defineStructure(TargetClass, name, type, component);
		expect(TargetClass.$name).toBeDefined();
		expect(TargetClass.$name).toEqual(name);

	});

	it('should add a property "$type" to the given class', () => {

		defineStructure(TargetClass, name, type, component);
		expect(TargetClass.$type).toBeDefined();
		expect(TargetClass.$type).toEqual(type);

	});

	it('should add a property "$component" to the given class', () => {

		defineStructure(TargetClass, name, type, component);
		expect(TargetClass.$component).toBeDefined();
		expect(TargetClass.$component).toEqual(component);

	});

	it('should add a property "$inject" to "$component"', () => {

		TargetClass.$inject = [];
		defineStructure(TargetClass, name, type, component);
		expect(TargetClass.$component.$inject).toBeDefined();
		expect(TargetClass.$component.$inject === TargetClass.$inject).toBeTruthy();

	});

});

describe('helper:defineAutodeclareMethod', () => {

	var moduleName = 'app',
		TargetClass = null,
		type = ANGULAR_ELEMENTS[0],
		ANGULAR_MODULE_FN = null,
		structCreationParams = null;

	beforeAll(() => {
		ANGULAR_MODULE_FN = global.angular.module;
	});

	beforeEach(() => {
		global.angular.module = generateNGMockedModuleFn((...params) => structCreationParams = params);
		TargetClass = class Target {
			method() {}
		};
		defineStructure(TargetClass, 'name', type, () => {});

	});


	it('should add a static method "autodeclare" to the given class', () => {
		defineAutodeclareMethod(TargetClass);

		expect(TargetClass.autodeclare).toBeDefined();
		expect(TargetClass.autodeclare instanceof Function).toBeTruthy();
	});

	it('should declare the given module to angular', () => {

		spyOn(global.angular.module(), type);
		defineAutodeclareMethod(TargetClass);
		TargetClass.autodeclare(moduleName);

		expect(global.angular.module()[type]).toHaveBeenCalled();
	});

	it('should call the angular method with the good parameters', () => {

		defineAutodeclareMethod(TargetClass);
		TargetClass.autodeclare(moduleName);

		let [name, component] = structCreationParams;

		expect(name).toEqual(TargetClass.$name);
		expect(component === TargetClass.$component).toBeTruthy();

	});


	afterAll(() => {
		global.angular.module = ANGULAR_MODULE_FN;
	});

});

function generateNGMockedModuleFn(callback = () => {}) {
	let core = {};
	ANGULAR_ELEMENTS.forEach((name) => core[name] = (...params) => callback(...params));
	return () => core;
}

describe('helper:applyTransformations', () => {

	var TargetClass = null,
		spyContainer = null;

	beforeEach(() => {
		TargetClass = class Target {
			method() {}
		};
		spyContainer = {spy: () => {}};
		spyOn(spyContainer, 'spy');
	});

	it('should call the transform methods', () => {

		TargetClass.prototype[getIdentifier(STRUCT_KEYS.transform)] = [spyContainer.spy];
		applyTransformations(TargetClass, {}, []);
		expect(spyContainer.spy).toHaveBeenCalled();

	});

	it('should pass to the transformer three parameters', () => {

		let transformParameters = [],
			Instance = {},
			Injections = [1, 2, 3];

		TargetClass.prototype[getIdentifier(STRUCT_KEYS.transform)] = [(...params) => transformParameters = params];
		applyTransformations(TargetClass, Instance, Injections);

		let [instance, target, injections] = transformParameters;

		expect(target === TargetClass).toBeTruthy();
		expect(instance === Instance).toBeTruthy();
		expect(injections === Injections).toBeTruthy();

	});

});

describe('helper:getNgStructure', () => {

	var TargetClass = null,
		instance = null;

	beforeEach(() => {
		TargetClass = class Target {
			prop1 = 1;
			method1() {return this.prop1;}
		};
		instance = new TargetClass();
	});

	it('should return the instance', () => {

		let structure = getNgStructure(TargetClass, instance);
		expect(structure === instance).toBeTruthy();

	});

	it('should return a proxy object that only contains the instance\s methods', () => {

		TargetClass.prototype[getIdentifier(STRUCT_KEYS.private)] = ['prop1'];

		let structure = getNgStructure(TargetClass, instance);

		expect(structure === instance).toBeFalsy();
		expect(structure.prop1).toBeUndefined();
		expect(structure.method1).toBeDefined();
		expect(structure.method1()).toEqual(instance.prop1);

	});

	it('should return a proxy object that only contains the instance\s attributes', () => {

		TargetClass.prototype[getIdentifier(STRUCT_KEYS.private)] = ['method1'];

		let structure = getNgStructure(TargetClass, instance);

		expect(structure === instance).toBeFalsy();
		expect(structure.method1).toBeUndefined();
		expect(structure.prop1).toBeDefined();
		expect(structure.prop1).toEqual(instance.prop1);

	});


});