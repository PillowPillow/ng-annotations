import {factory, autobind, inject} from '../../../src/app';
import app from '../index';

@inject('$http')
@factory('factory.factories.foobar')
export class FooBarFactory {

	@autobind
	getContext() {
		return this;
	}

	get() {
		let obj = { getContext: this.getContext };
		return obj.getContext();
	}
}

@factory('factory.factories.barfoo')
export class BarFooFactory {

	foo = 0;
	bar = 0;

	$expose() {
		let self = this;
		return {
			get foo() { return self.foo; }
		}
	}
}

@factory('factory.factories.barbar')
@inject(BarFooFactory)
export class BarBarFactory {

	constructor(barfoo) {
		this.barfoo = barfoo;
	}

	getInjection() {
		return this.barfoo;
	}
}


[
	FooBarFactory,
	BarFooFactory,
	BarBarFactory
].forEach(component => component.autodeclare(app));
