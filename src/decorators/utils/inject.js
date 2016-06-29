/**
 * @decorator: @inject
 * @type: function
 *
 * replaces the angular dependency injection system
 *
 * @param toInject  string|Array
 * @param more (optional)  string[]
 */
export function inject(toInject, ...more) {
	if(!(toInject instanceof Array)) {
		toInject = [toInject];
		if(more.length > 0)
			toInject = toInject.concat(more);
	}
	toInject.forEach((component, index) => {
		if(component instanceof Object && '$name' in component)
			toInject[index] = component.$name;
	});

	return injectTo(toInject, '$inject');
}

export function injectTo(toInject, targetField) {
	return (target, ...options) => {

		if(options.length > 0)
			target = options[1].value;

		Object.defineProperty(target, targetField, {
			value: toInject,
			enumerable: true,
			configurable: true
		});
	}
}