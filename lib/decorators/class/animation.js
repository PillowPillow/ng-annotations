import {inject} from '../mix/inject';
import {NG_ELEMENTS} from '../../constants/enums';
import {extractParamsFromFunction} from '../../helpers/util';
import {applyTransformations, getNgStructure, defineAutodeclareMethod, defineStructure} from '../../helpers/structure';

export function NgAnimation(name = '') {
	return (target) => {
		name = name || target.name;

		function component(...injections) {
			let instance = new target(...injections);
			applyTransformations(target, instance, injections);
			return getNgStructure(target, instance);
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = extractParamsFromFunction(target);
			if(parameters.length > 0)
				inject(parameters)(component);
		}

		defineAutodeclareMethod(target);
		defineStructure(target, name, NG_ELEMENTS.animation, component);
	}
}