import {STRUCT_KEYS} from '../../constants/enums';
import {getIdentifier} from '../../helpers/identifier';

export function attach(source = 'this', path = '') {

	if(typeof source !== 'string'
	   && !(source instanceof Object && '$name' in source))
		throw Error(`the source param of @attach must be a string or an annotated component, ${typeof source} given`)

	if(typeof path !== 'string')
		throw Error(`the path param of @attach must be a string, ${typeof path} given`)

	return (prototype, name, descriptor) => {

		let descriptorDefined = true;
		if(name && !descriptor) {
			descriptorDefined = false;
			descriptor = {};
		}

		if(descriptor instanceof Object
		   && (descriptor.set !== undefined || descriptor.get !== undefined))
			throw Error(`@attach decorator cannot be applied to an accessor`);

		if(name === undefined)
			throw Error(`@attach decorator can only be applied to methods or attributes`);

		descriptor.configurable = true;

		if(source instanceof Object)
			source = source.$name;

		let $transformKey = getIdentifier(STRUCT_KEYS.transform);

		if(prototype[$transformKey] === undefined
		   || !(prototype[$transformKey] instanceof Array))
			prototype[$transformKey] = [];

		let steps = path.split('.'),
			propertyName = steps.pop();

		if(source === 'this') {
			delete descriptor.initializer;
			delete descriptor.value;
			setAccessors(steps, propertyName, descriptor);
		}
		else
			prototype[$transformKey].push(createAttachTransformation(source, steps, propertyName, name));

		if(!descriptorDefined)
			Object.defineProperty(prototype, name, descriptor);
	}
}

export function createAttachTransformation(sourceName, steps, propertyName, targetName) {
	return function attachTransformation(context, component, injections) {

		let $inject = component[STRUCT_KEYS.inject] || [],
			index = $inject.indexOf(sourceName);
		if(!~index)
			throw Error(`unable to attach the property ${propertyName}, the component ${sourceName} isn't loaded`)
		let {configurable, enumerable} = Object.getOwnPropertyDescriptor(context, targetName);
		let descriptor = {configurable, enumerable};
		setAccessors(steps, propertyName, descriptor, injections[index]);
		delete context[targetName];
		Object.defineProperty(context, targetName, descriptor);
	}
}

export function setAccessors(steps, property, descriptor, context = undefined) {
	descriptor.get = function() {
		if(context === undefined)
			context = this;
		if(!property)
			return context;
		let src = getSrc(context, steps);
		return src[property] instanceof Function ? src[property].bind(src) : src[property];
	};
	descriptor.set = function(val) {
		if(context === undefined)
			context = this;
		if(!property)
			return context;
		let src = getSrc(context, steps);
		src[property] = val;
	};
}

export function getSrc(source, path = []) {
	if(path.length > 0)
		for(var i = 0; i < path.length; i++) {
			if(!(source instanceof Object))
				throw Error('unable to acces to the given property, invalid path');
			source = source[path[i]];
			if(!source)
				throw Error('unable to acces to the given property');
		}
	return source;
}
