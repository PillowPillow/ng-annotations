export default class NgDecoratorUtils {

	static regexArgs = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	static regexStripComment = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	static angularComponents = ['config','run','value','constant','animation','controller','directive','factory','provider','service','filter'];

	static extractParameters(fn) {
		var fnText = fn.toString().replace(this.regexStripComment, ''),
			args = fnText.match(this.regexArgs);
		return args && args[1].length > 0? args[1].split(',') : [];
	}

	static addDeclareMethod(target) {
		Object.defineProperty(target, 'autodeclare', {
			configurable: true,
			enumerable: false,
			value: function(ngModule) {
				let params = !!this.$name ? [this.$name, this.$component] : [this.$component];
				if(typeof ngModule === 'string')
					ngModule = angular.module(ngModule);
				return ngModule[this.$type](...params);
			}
		});
	}

	static applyTransformations(component, instance, injections) {
		var transformations = instance.$transform || [];
		transformations.forEach(transformation => transformation(instance, component, injections));
	}

	static defineComponent(target, name, type, component) {

		if(!~this.angularComponents.indexOf(type))
			throw Error('the given type must be a valid angular component')

		Object.defineProperties(target, {
			'$name': {
				value: name !== undefined ? name : target.name,
				enumerable: true,
				configurable: true
			},
			'$type': {
				value: type,
				enumerable: true,
				writable: false
			},
			'$component': {
				value: component,
				enumerable: true,
				configurable: true
			}
		});
	}
}