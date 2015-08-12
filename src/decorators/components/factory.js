import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @factory
 * @type: function
 *
 * declares a new angular factory
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgFactory(name = '') {
	return (target) => {
		name = name || target.name;

		var component = function(...injections) {
			let factory = new target(...injections);
			utils.applyTransformations(target, factory, injections);
            return factory.$expose instanceof Function ? factory.$expose() : factory;
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(component);
		}
		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'factory', component);
	}
}