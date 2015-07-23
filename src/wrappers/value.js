import utils from 'src/libs/utils';

/**
 * @name: @value
 *
 * declares a new angular value
 *
 * @param name  value name
 * @param value value name
 *
 * @returns {Object}
 */
export default function NgValue(name, value) {
	var component = {};
	utils.addDeclareMethod(component);
	utils.defineComponent(component, name, 'value', value);
	return component;
}
