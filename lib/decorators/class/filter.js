import {inject} from '../mix/inject';
import {NG_ELEMENTS, STRUCT_KEYS} from '../../constants/enums';
import {extractParamsFromFunction} from '../../helpers/util';
import {applyTransformations, getNgStructure, defineAutodeclareMethod, defineStructure} from '../../helpers/structure';

export function NgFilter(filterProps = {name:'',stateful:false}) {

	return (target) => {

		let name = '', stateful = false;
		if(filterProps instanceof Object){
			name = filterProps.name || target.name;
			stateful = !!filterProps.stateful;
		}
		else
			name = filterProps || target.name;

		function core(...injections) {
            let instance = new target(...injections);

			if(!(instance.$filter instanceof Function))
				throw Error('an annotated "filter" must implement the "$filter" method');
			applyTransformations(target, instance, injections);

			if(stateful)
				filter.$stateful = stateful;

			return filter;

			function filter(...parameters) {
			    return instance.$filter(...parameters);
			}
		}

		if(!(target[STRUCT_KEYS.inject] instanceof Array) || target[STRUCT_KEYS.inject].length === 0) {
			var parameters = extractParamsFromFunction(target);
			if(parameters.length > 0)
				inject(parameters)(core);
		}

		defineAutodeclareMethod(target);
		defineStructure(target, name, NG_ELEMENTS.filter, core);
	}
}