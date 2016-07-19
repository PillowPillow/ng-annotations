import {defineAutodeclareMethod, defineStructure} from '../helpers/structure';
import {NG_ELEMENTS} from '../constants/enums';

export function NgConstant(name, value) {
	var core = {};
	defineAutodeclareMethod(core);
	defineStructure(core, name, NG_ELEMENTS.constant, value);
	return core;
}
