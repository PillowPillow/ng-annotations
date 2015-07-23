import utils from 'src/libs/utils';

/**
 * @decorator: @controller
 * @type: function
 *
 * declares a new angular controller
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgController(name = '') {
	return (target) => {
		name = name || target.name;
		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'controller', target);
	}
}