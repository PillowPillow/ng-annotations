import {defineAutodeclareMethod, defineStructure} from '../helpers/structure';
import {NG_ELEMENTS} from '../constants/enums';

export function NgValue(name, value) {
	var core = {};
	defineAutodeclareMethod(core);
	defineStructure(core, name, NG_ELEMENTS.value, value);
	return core;
}
