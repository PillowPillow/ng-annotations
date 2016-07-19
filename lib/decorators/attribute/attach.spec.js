import {attach, getSrc, setAccessors, createAttachTransformation} from './attach';
import {STRUCT_KEYS} from '../../constants/enums';
import {getIdentifier} from '../../helpers/identifier';

describe('decorator:attach', () => {

	var TargetClass = null;

	beforeEach(() => {
		TargetClass = class Target {
			@attach('test')
			prop = null;

			method() {}
		};
	});

	it('should add a transform fn to the class\'s prototype', () => {
		let transformKey = getIdentifier(STRUCT_KEYS.transform);

		expect(TargetClass.prototype[transformKey]).toBeDefined();

	});

});

describe('decorator:attach:getSrc', () => {

	var obj = {a: {b: {c: 1}}};

	it('should retrieve a value from an object and a path', () => {

		let val = getSrc(obj, ['a', 'b', 'c']);
		expect(val).toEqual(obj.a.b.c);

	});

});

describe('decorator:attach:setAccessors', () => {

	var definition = null,
		source = null;

	beforeEach(() => {
		definition = {};
		source = {a: {b: {c: 1}}};
	});

	it('should add two methods to the given definition', () => {

		setAccessors([], 'property', definition);
		expect(definition.get).toBeDefined();
		expect(definition.set).toBeDefined();

	});

	it('should create a proxy object', () => {

		setAccessors(['a', 'b'], 'c', definition, source);

		let value = definition.get();
		expect(value).toBeDefined();
		expect(value).toEqual(source.a.b.c);

		definition.set('test');
		expect(source.a.b.c).toEqual('test');

	});

});

describe('decorator:attach:createAttachTransformation', () => {

	var target = null,
		tfn = null,
		coreComponent = {
			[STRUCT_KEYS.inject]: ['target']
		};

	beforeEach(() => {
		target = {a: {b: {c: 1}}};
		tfn = createAttachTransformation('target', ['a', 'b'], 'c', 'boundProp');
		coreComponent = {
			[STRUCT_KEYS.inject]: ['target']
		}
	});

	it('should generate a transform fn', () => {
		expect(tfn instanceof Function).toBeTruthy();
	});

	it('should generate an transform fn', () => {
		let context = {boundProp: null};
		tfn(context, coreComponent, [target]);
		expect(context.boundProp).toBeDefined();
		expect(context.boundProp).toEqual(target.a.b.c);
	});

});

