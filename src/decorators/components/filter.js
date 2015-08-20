import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @filter
 * @type: function
 *
 * declares a new angular filter
 *
 * @param filterProps (optional)  filter properties containing name and the stateful attribute
 *
 * @returns {Function}
 */
export default function NgFilter(filterProps = {name:'',stateful:false}) {

	return (target) => {

		let name = '', stateful = false;
		if(filterProps instanceof Object){
			name = filterProps.name || target.name;
			stateful = !!filterProps.stateful;
		}
		else
			name = filterProps || target.name;

		var component = function(...injections) {
            let instance = new target(...injections);

			if(!(instance.$filter instanceof Function))
				throw Error('an annotated "filter" must implement the "$filter" method');
			utils.applyTransformations(target, instance, injections);

			//@todo remove it in the next version
			if(instance.$stateful === true) {
				console.warn('the $stateful property is deprecated and will be removed in the next versions, use the @filter parameter instead');
				console.warn('https://github.com/PillowPillow/ng-annotations#d_filter');
				filter.$stateful = true;
			}

			if(stateful)
				filter.$stateful = stateful;

			return filter;
			function filter(...parameters) {
			    return instance.$filter(...parameters);
			}
		}

		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(component);
		}

		utils.addDeclareMethod(target);
		utils.defineComponent(target, name, 'filter', component);
	}
}