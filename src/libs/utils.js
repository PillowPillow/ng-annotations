export default class NgDecoratorUtils {

	static regexArgs = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	static regexStripComment = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	static angularComponents = ['config', 'run', 'value', 'constant', 'animation', 'controller', 'directive', 'factory', 'provider', 'service', 'filter'];
	static identifiers = {};

	static extractParameters(fn) {
		var fnText = fn.toString().replace(this.regexStripComment, ''),
		args = fnText.match(this.regexArgs);
		return args && args[1].length > 0 ? args[1].split(',') : [];
	}

	static getUUID(pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
		return pattern.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	static arrayUnique(arr = []) {
		var ret = [arr[0]];
		for(var i = 1; i < arr.length; i++)
			if(arr[i - 1] !== arr[i])
				ret.push(arr[i]);
		return ret;
	}

	static getIdentifier(key) {

		if(this.identifiers[key] === undefined)
			this.identifiers[key] = window.Symbol ? Symbol(key) : this.getUUID();

		return this.identifiers[key];
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

	static applyTransformations(component, instance = {}, injections = []) {
		let $transformKey = this.getIdentifier('$transform'),
		transformations = component.prototype[$transformKey] || [];
		transformations.forEach(transformation => transformation(instance, component, injections));
	}

	static getFinalComponent(target, instance) {

		let $privateKey = this.getIdentifier('$private'),
		privateProperties = target.prototype[$privateKey] || [];

		if(privateProperties.length === 0)
			return instance;

		privateProperties.push('constructor');
		let prototypeProperties = Object.getOwnPropertyNames(target.prototype),
		instanceProperties = Object.getOwnPropertyNames(instance);

		let properties = this.arrayUnique(prototypeProperties.concat(instanceProperties)),
		publicProperties = properties.filter(property => !~privateProperties.indexOf(property)),
		exposed = {};

		publicProperties.forEach(property => {
			if(instance[property] instanceof Function) {
				exposed[property] = (...parameters) => instance[property](...parameters);
				Object.defineProperties(exposed[property], {
					call: {
						value: (scope = instance, ...parameters) => instance[property].apply(scope, parameters),
						writable: false,
						enumerable: false
					},
					apply: {
						value: (scope = instance, parameters = []) => instance[property].apply(scope, parameters),
						writable: false,
						enumerable: false
					}
				});
			}
			else
				Object.defineProperty(exposed, property, {
					get: () => instance[property],
					set: (val) => instance[property] = val,
					enumerable: false
				});
		});

		return exposed;
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

		if(target.$component instanceof Object)
			Object.defineProperty(target.$component, '$inject', {
				get: () => target.$inject || [],
				set: (val) => target.$inject = val
			});
	}
}