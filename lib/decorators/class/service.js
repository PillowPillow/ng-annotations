import {inject} from '../mix/inject';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {extractParamsFromFunction} from '../../helpers/util';
import {applyTransformations, getNgStructure, defineAutodeclareMethod, defineStructure} from '../../helpers/structure';

export function NgService(name = '') {
	return (target) => {
		name = name || target.name;

		function core(...injections) {
			let instance = new target(...injections);
			applyTransformations(target, instance, injections);
            return getNgStructure(target, instance);
		}

		if(!(target[STRUCT_KEYS.inject] instanceof Array) || target[STRUCT_KEYS.inject].length === 0) {
			var parameters = extractParamsFromFunction(target);
			if(parameters.length > 0)
				inject(parameters)(target);
		}

		defineAutodeclareMethod(target);
		defineStructure(target, name, NG_ELEMENTS.service, core);
	}
}