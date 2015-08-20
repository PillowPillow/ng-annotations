import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @filter
 * @type: function
 *
 * declares a new angular filter
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgFilter(name = '') {
	return (target) => {
		name = name || target.name;

		var component = function(...injections) {
            let instance = new target(...injections);

			if(!(instance.$filter instanceof Function))
				throw Error('an annotated "filter" must implement the "$filter" method');
			utils.applyTransformations(target, instance, injections);

			if(instance.$stateful === true)
				filter.$stateful = true;

			return filter;
			function filter(...parameters) {
			    return instance.$filter(...parameters);
			}
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(component);
		}

		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'filter', component);
	}
}