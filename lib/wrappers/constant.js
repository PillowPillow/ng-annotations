import {defineAutodeclareMethod, defineStructure} from '../helpers/structure';
import {NG_ELEMENTS} from '../constants/enums';

export function NgConstant(name, value) {
	var component = {};
	defineAutodeclareMethod(component);
	defineStructure(component, name, NG_ELEMENTS.constant, value);
	return component;
}
