export function autobind(props, name, descriptor) {

	let fn = descriptor.value;

	if(typeof fn !== 'function')
		throw Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
	return {
		configurable: true,
		get: function get() {
			var boundFn = fn.bind(this);
			Object.defineProperty(this, name, {
				value: boundFn,
				configurable: true,
				writable: true
			});
			return boundFn;
		}
	};
}