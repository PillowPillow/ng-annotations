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

		if(prototype.$attach === undefined
		|| !(prototype.$attach instanceof Array))
			prototype.$attach = [];

		let pathSteps = path.split('.'),
			propertyName = pathSteps.pop();

		if(source === 'this') {
			delete descriptor.initializer;/*babel patch*/
			delete descriptor.value;
			descriptor.get = function() {
				let src = getSrc(this, pathSteps);
				return src[propertyName];
			};
			descriptor.set = function(val) {
				let src = getSrc(this, pathSteps);
				src[propertyName] = val;
			};
		}
		else prototype.$attach.push({
			source,
			path,
			pathSteps,
			propertyName,
			target: name
		});
	}
}

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
