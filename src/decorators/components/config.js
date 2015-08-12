import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @config
 * @type: function
 *
 * declares a new angular config
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgConfig() {
	return (target) => {

		var component = function(...injections) {
			let config = new target(...injections);
			utils.applyTransformations(target, config, injections);
            return config;
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(component);
		}

		utils.addDeclareMethod(target);
		utils.defineComponent(target, null, 'config', component);
	}
}