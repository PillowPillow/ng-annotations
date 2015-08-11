import utils from 'src/libs/utils';

/**
 * @decorator: @attach
 * @type: function
 *
 * replaces the angular dependency attachion system
 *
 * @param source  string component name or this
 * @param path (optional)  string path toward the property
 */
export default function attach(source = 'this', path = '') {

	if(typeof source !== 'string'
	&& !(source instanceof Object && '$name' in source))
		throw Error(`the source param of @attach must be a string or an annotated component, ${typeof source} given`)

	if(typeof path !== 'string')
		throw Error(`the path param of @attach must be a string, ${typeof path} given`)

	return (prototype, name, descriptor) => {

		if(descriptor instanceof Object
		&& (descriptor.set !== undefined || descriptor.get !== undefined))
			throw Error(`@attach decorator cannot be applied to an accessor`);

		if(name === undefined)
			throw Error(`@attach decorator can only be applied to methods or attributes`);

		if(source instanceof Object)
			source = source.$name;

		let $transformKey = utils.getIdentifier('$transform');

		if(prototype[$transformKey] === undefined
		|| !(prototype[$transformKey] instanceof Array))
			prototype[$transformKey] = [];

		let steps = path.split('.'),
			propertyName = steps.pop();

		if(source === 'this') {
			delete descriptor.initializer;
			delete descriptor.value;
			setDescriptor(source,steps,propertyName,descriptor);
		}
		else
			prototype[$transformKey].push(getApplyTransformation(source,steps,propertyName,name));
	}
}

/**
 * @param sourceName    String. name of the source component
 * @param steps Array. path toward the property
 * @param propertyName  String. property name
 * @param targetName    String. name of the target property
 * @returns {Function}
 */
function getApplyTransformation(sourceName, steps, propertyName, targetName) {
	return function attachTransformation(context, component, injections) {

		let $inject = component.$inject || [],
			index = $inject.indexOf(sourceName);
		if(!~index)
			throw Error(`unable to attach the property ${propertyName}, the component ${sourceName} isn't loaded`)

		let {configurable, enumerable} = Object.getOwnPropertyDescriptor(context, targetName);
		let descriptor = {configurable, enumerable};
		setDescriptor(sourceName, steps, propertyName, descriptor, injections[index]);
		delete context[targetName];
		Object.defineProperty(context, targetName, descriptor);
	}
}

/**
 * @param source    Object. source object
 * @param steps Array. path toward the property
 * @param property  String. property name
 * @param descriptor    Object. property descriptor
 * @param context   (optional) Object. exec context
 */
function setDescriptor(source, steps, property, descriptor, context = undefined) {
	descriptor.get = function() {
		if(context === undefined)
			context = this;
		let src = getSrc(context, steps);
		return src[property] instanceof Function ? src[property].bind(src) : src[property];
	};
	descriptor.set = function(val) {
		if(context === undefined)
			context = this;
		let src = getSrc(context, steps);
		src[property] = val;
	};
}


/**
 * @param source    Object. source object
 * @param path Array. path toward the property
 */
function getSrc(source, path = []) {
	if(path.length > 0)
		for(var i=0; i<path.length; i++) {
			if(!(source instanceof Object))
				throw Error('unable to acces to the given property, invalid path');
			source = source[path[i]];
			if(!source)
				throw Error('unable to acces to the given property');
		}
	return source;
}
