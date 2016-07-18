import {ANGULAR_ELEMENTS} from '../constants/angularElements';
import {getIdentifier} from './identifier';
import {arrayUnique} from './util';
import {STRUCT_KEYS} from '../constants/enums';

export function defineStructure(target, name, type, coreFn) {

	if(!~ANGULAR_ELEMENTS.indexOf(type))
		throw Error('The given type must be a valid angular component');

	Object.defineProperties(target, {
		[STRUCT_KEYS.name]: {
			value: name !== undefined ? name : target.name,
			enumerable: true,
			configurable: true
		},
		[STRUCT_KEYS.type]: {
			value: type,
			enumerable: true,
			writable: false
		},
		[STRUCT_KEYS.component]: {
			value: coreFn,
			enumerable: true,
			configurable: true
		}
	});

	if(target[STRUCT_KEYS.component] instanceof Object)
		Object.defineProperty(target[STRUCT_KEYS.component], STRUCT_KEYS.inject, {
			get: () => target[STRUCT_KEYS.inject] || [],
			set: (val) => target[STRUCT_KEYS.inject] = val
		});
}

export function defineAutodeclareMethod(target) {


	Object.defineProperty(target, STRUCT_KEYS.autodeclare, {
		configurable: true,
		enumerable: false,
		value: function(ngModule) {
			let component = this[STRUCT_KEYS.component],
				injectKey = getIdentifier(STRUCT_KEYS.inject),
				type = this[STRUCT_KEYS.type];

			if(this[STRUCT_KEYS.component] instanceof Object
			   && injectKey in this[STRUCT_KEYS.component])
				component = [...this[STRUCT_KEYS.component][injectKey], this[STRUCT_KEYS.component]];

			let params = !!this.$name ? [this.$name, component] : [component];

			if(typeof ngModule === 'string')
				ngModule = angular.module(ngModule);

			return ngModule[type](...params);
		}
	});

}

export function applyTransformations(target, instance = {}, injections = []) {
	let $transformKey = getIdentifier(STRUCT_KEYS.transform),
		transformations = target.prototype[$transformKey] || [];
	transformations.forEach(transformation => transformation(instance, target, injections));
}


export function getNgStructure(target, instance) {

	let $privateKey = getIdentifier(STRUCT_KEYS.private),
		privateProperties = target.prototype[$privateKey] || [];

	if(privateProperties.length === 0)
		return instance;

	privateProperties.push('constructor');
	let prototypeProperties = Object.getOwnPropertyNames(target.prototype),
		instanceProperties = Object.getOwnPropertyNames(instance);

	let properties = arrayUnique(prototypeProperties.concat(instanceProperties)),
		publicProperties = properties.filter(property => !~privateProperties.indexOf(property)),
		exposed = {};

	publicProperties.forEach(property => {
		if(instance[property] instanceof Function) {
			exposed[property] = (...parameters) => instance[property](...parameters);
			Object.defineProperties(exposed[property], {
				call: {
					value: (scope = instance, ...parameters) => instance[property].apply(scope, parameters),
					writable: false,
					enumerable: false
				},
				apply: {
					value: (scope = instance, parameters = []) => instance[property].apply(scope, parameters),
					writable: false,
					enumerable: false
				}
			});
		}
		else
			Object.defineProperty(exposed, property, {
				get: () => instance[property],
				set: (val) => instance[property] = val,
				enumerable: false
			});
	});

	return exposed;
}