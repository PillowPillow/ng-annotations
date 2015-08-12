import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @service
 * @type: function
 *
 * declares a new angular service
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgService(name = '') {
	return (target) => {
		name = name || target.name;

		var component = function(...injections) {
			let service = new target(...injections);
			utils.applyTransformations(target, service, injections);
            return service;
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(target);
		}

		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'service', component);
	}
}