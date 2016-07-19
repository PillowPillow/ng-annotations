import {autobind} from './autobind';

describe('decorator:autobind', () => {

	var TargetClass = null;

	beforeEach(() => {
		TargetClass = class Target {
			@autobind
			method() {
				return this;
			}
		};
	});

	it('should keep the context', () => {

		let instance = new TargetClass(),
			obj = {};

		obj.method = instance.method;
		expect(obj.method() === instance.method()).toBeTruthy();
	});

});
