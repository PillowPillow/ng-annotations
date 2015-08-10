import utils from 'src/libs/utils';

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
		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'service', component);
	}
}