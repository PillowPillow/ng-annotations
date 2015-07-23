/**
 * @decorator: @inject
 * @type: function
 *
 * replaces the angular dependency injection system
 *
 * @param toInject  string|Array
 * @param more (optional)  string[]
 */
export default function inject(toInject, ...more) {

	if(!(toInject instanceof Array)) {
		toInject = [toInject];
		if(more.length > 0)
			toInject = toInject.concat(more);
	}

	return (target, ...options) => {

		if(options.length > 0)
			target = options[1].value;

		Object.defineProperty(target, '$inject', {
			value: toInject,
			enumerable: true,
			configurable: true
		});
	}
}