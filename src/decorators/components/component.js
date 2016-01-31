import utils from 'src/libs/utils';
import inject from 'src/decorators/utils/inject';

/**
 * @decorator: @component
 * @type: function
 *
 * declares a new component (directive + controller)
 *
 * @param options (mandatory) components options
 * @paramEx
 * {
 *      selector (string) mandatory - directive name
 *      alias (string) optional controllerAs option - defaults to selector value
 *      type (string) optional - restrict directive option
 *      ioProps (object) optional binded properties - two way binding
 *      template (string) optional - template string
 *      templateUrl (string) optional - template url
 *      transclude (boolean) optional
 *      lifecycle (object - array of hooks) optional - lifecycle callbacks(compile/prelink/postlink)
 * }
 *
 * @example
 *
 *  @component({
 *  	selector: 'myComponent',
 *  	alias: '', //optional
 *  	type: 'EA', //optional, defaults to E
 *  	ioProps: {
 *  		'prop1': 'property1',
 *  		'prop2': 'property2'
 *  	}, //optional
 *  	template: '', //optional
 *  	//templateUrl: '', //optional
 *  	//transclude: true
 *  	lifecycle: {
 *  		compile: () => {},
 *  		prelink: () => {},
 *  		postlink: () => {}
 *  	} //optional
 *  })
 *  export class FooBarComponent {
 *
 *  	$ioProps = {
 *  		prop1: null,
 *  		prop2: null
 *  	}; //auto injected by the ioProps component option
 *
 *  }
 *
 * @returns {Function}
 */
export default function NgComponent(options = {}) {

	let {selector, directive: directiveOpts} = extractComponentOptions(options);

	return (target) => {

		let controller = generateController(target, selector);
		directiveOpts.controller = controller.$name;
		let directive = generateDirective(selector, directiveOpts);


		Object.defineProperties(target, {
			'$composite': {
				value: {controller, directive},
				enumerable: true,
				configurable: true
			},
			'$type': {
				value: 'component',
				enumerable: true,
				writable: false
			},
			'autodeclare': {
				configurable: true,
				enumerable: false,
				value: function(ngModule) {
					let {controller, directive} = this.$composite;
					controller.autodeclare(ngModule);
					directive.autodeclare(ngModule);
				}
			}
		});

	}

}

function generateController(target, selector) {

	let controller = {
			get $inject() {
				return target.$inject;
			}
		},
		controllerName = `${selector}-component-${utils.getUUID()}`;

	var component = function(...injections) {
		let instance = new target(...injections);
		if(!instance.$ioProps)
			instance.$ioProps = {};
		utils.applyTransformations(target, instance, injections);
		return utils.getFinalComponent(target, instance);
	}

	if(!(target.$inject instanceof Array) || target.$inject.length === 0) {
		var parameters = utils.extractParameters(target);
		if(parameters.length > 0)
			inject(parameters)(component);
	}

	utils.addDeclareMethod(controller);
	utils.defineComponent(controller, controllerName, 'controller', component);

	return controller;
}

function generateDirective(selector, options) {
	let directive = {};
	utils.addDeclareMethod(directive);
	utils.defineComponent(directive, selector, 'directive', () => options);
	return directive;
}

function extractComponentOptions(options = {}) {

	let opts = {
			selector: null,
			directive: {
				restrict: 'E',
				scope: {},
				controllerAs: null,
				controller: null,
				transclude: false
			}
		},
		hooks = {
			compile: () => {},
			prelink: () => {},
			postlink: () => {}
		};

	if(typeof options.selector !== 'string' || !options.selector.length)
		throw Error(`@component: the selector option is mandatory and should be a string, ${typeof options.selector} given`);
	else opts.selector = opts.directive.controllerAs = options.selector;

	if(typeof options.ioProps === 'object' && !!options.ioProps) {
		let props = Object.keys(options.ioProps);
		for(let i = 0, length = props.length; i < length; i++) {
			let propKey = props[i];
			opts.directive.scope[propKey] = `=${options.ioProps[propKey]}`;
		}
	}

	if(typeof options.alias === 'string' && options.alias.length > 0)
		opts.directive.controllerAs = options.alias;

	if(typeof options.type === 'string' && options.type.length > 0)
		opts.directive.restrict = options.type;

	if('template' in options)
		opts.directive.template = options.template;
	if('templateUrl' in options)
		opts.directive.templateUrl = options.templateUrl;

	if('transclude' in options)
		opts.directive.transclude = !!options.transclude;

	if(typeof options.lifecycle === 'object' && options.lifecycle) {

		if('compile' in options.lifecycle && typeof options.lifecycle.compile === 'function')
			hooks.compile = options.lifecycle.compile;
		if('prelink' in options.lifecycle && typeof options.lifecycle.prelink === 'function')
			hooks.prelink = options.lifecycle.prelink;
		if('postlink' in options.lifecycle && typeof options.lifecycle.postlink === 'function')
			hooks.postlink = options.lifecycle.postlink;

	}

	opts.directive.compile = function(...compileArgs) {
		hooks.compile.apply(this, ...compileArgs);
		return {
			pre: function(scope, element, attributes, controller, transcludeFn) {
				let ioPropsContainer = {}
				if(!controller.$ioProps || typeof controller.$ioProps !== 'object')
					controller.$ioProps = ioPropsContainer;
				else
					ioPropsContainer = controller.$ioProps;

				let props = Object.keys(options.ioProps || []);
				props.forEach((propname) => {
					Object.defineProperty(ioPropsContainer, propname, {
						get() { return scope[propname]; },
						set(val) { scope[propname] = val; }
					});
				});
				Object.defineProperty(ioPropsContainer, 'length', {
					get() { return props.length; },
					enumerable: true
				});

				hooks.prelink.apply(this, [scope, element, attributes, controller, transcludeFn])
			},
			post: function(...postArgs) {
				hooks.postlink.apply(this, postArgs)
			}
		}
	}

	return opts;
}