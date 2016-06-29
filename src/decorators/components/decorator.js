import utils from 'src/libs/utils';
import {inject, injectTo} from 'src/decorators/utils/inject';

/**
 * @decorator: @decorator
 * @type: function
 *
 * declares a new angular decorator
 *
 * @param name (optional)  replaces the class name
 *
 * @returns {Function}
 */
export default function NgDecorator(name = '') {
	return (target) => {
		name = name || target.name;

		var $delegatefn = function(...injections) {
			let $inject = target.$inject || ['$delegate'];
			let delegateIndex = $inject.indexOf('$delegate');

			let instance = new target(...injections);
			utils.applyTransformations(target, instance, injections);

			let exposed = utils.getFinalComponent(target, instance);
			return exposed.$decorate instanceof Function ? exposed.$decorate() : injections[delegateIndex];
		};

		var component = function($provide) {
			var injections = target.$inject || [];
			if(!~injections.indexOf('$delegate')) injections.push('$delegate');
			$provide.decorator(name, [...injections, $delegatefn]);
		};


		injectTo(['$provide'], '_$inject')(component);
		if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
			var parameters = utils.extractParameters(target);
			if(parameters.length > 0)
				inject(parameters)(target);
		}

		utils.addDeclareMethod(target);
		utils.defineComponent(target, null, 'config', component);
	}
}