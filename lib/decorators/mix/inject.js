import {injectTo} from '../../helpers/injection';

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

	return injectTo('$inject', toInject);
}
