export function injectTo(targetField, toInject) {
	return (target, ...args) => {

		if(args.length > 0) {
			let [name,definition] = args;

			if(!definition) {
				definition = { enumerable:true, configurable: true, value: target.prototype[name] };
				Object.defineProperty(target.prototype, name, definition);
			}

			target = definition.value;
		}

		Object.defineProperty(target, targetField, {
			value: toInject,
			enumerable: true,
			configurable: true
		});
	}
}