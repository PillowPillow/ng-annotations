import utils from 'src/libs/utils';

/**
 * @name: @constant
 *
 * declares a new angular constant
 *
 * @param name  constant name
 * @param value value name
 *
 * @returns {Object}
 */
export default function NgConstant(name, value) {
	var component = {};
	utils.addDeclareMethod(component);
	utils.defineComponent(component, name, 'constant', value);
	return component;
}
