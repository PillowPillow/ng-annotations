import {inject} from '../mix/inject';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {extractParamsFromFunction} from '../../helpers/util';
import {applyTransformations, defineAutodeclareMethod, defineStructure} from '../../helpers/structure';

export function NgConfig() {
	return (target) => {

		function core(...injections) {
			let instance = new target(...injections);
			applyTransformations(target, instance, injections);
			return instance;
		}

		if(!(target[STRUCT_KEYS.inject] instanceof Array) || target[STRUCT_KEYS.inject].length === 0) {
			var parameters = extractParamsFromFunction(target);
			if(parameters.length > 0) inject(parameters)(core);
		}

		defineAutodeclareMethod(target);
		defineStructure(target, null, NG_ELEMENTS.config, core);
	}
}