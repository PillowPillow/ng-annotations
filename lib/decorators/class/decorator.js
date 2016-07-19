import {inject} from '../mix/inject';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {injectTo} from '../../helpers/injection';
import {getIdentifier} from '../../helpers/identifier';
import {extractParamsFromFunction} from '../../helpers/util';
import {applyTransformations, getNgStructure, defineAutodeclareMethod, defineStructure} from '../../helpers/structure';

export function NgDecorator(name = '') {
	return (target) => {
		name = name || target.name;

		var $delegatefn = function(...injections) {
			let $inject = target[STRUCT_KEYS.inject] || ['$delegate'];
			let delegateIndex = $inject.indexOf('$delegate');

			let instance = new target(...injections);
			applyTransformations(target, instance, injections);

			let exposed = getNgStructure(target, instance);
			return exposed.$decorate instanceof Function ? exposed.$decorate() : injections[delegateIndex];
		};

		function core($provide) {
			let injections = target[STRUCT_KEYS.inject] || [];
			if(!~injections.indexOf('$delegate')) injections.push('$delegate');
			$provide.decorator(name, [...injections, $delegatefn]);
		}

		injectTo(getIdentifier(STRUCT_KEYS.inject), ['$provide'])(core);
		if(!(target[STRUCT_KEYS.inject] instanceof Array) || target[STRUCT_KEYS.inject].length === 0) {
			var parameters = extractParamsFromFunction(target);
			if(parameters.length > 0) inject(parameters)(target);
		}

		defineAutodeclareMethod(target);
		defineStructure(target, null, NG_ELEMENTS.config, core);
	}
}