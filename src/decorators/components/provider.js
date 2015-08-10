import utils from 'src/libs/utils';

/**
 * @decorator: @provider
 * @type: function
 *
 * declares a new angular provider
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgProvider(name = '') {
	return (target) => {
		name = name || target.name;

		var component = function(...injections) {
			let provider = new target(...injections);
			utils.applyTransformations(target, provider, injections);
            return provider;
		}
		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'provider', component);
	}
}