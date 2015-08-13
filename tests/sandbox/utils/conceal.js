import {controller,service,factory,attach,inject,conceal} from '../../../src/app';
import app from '../index';

@factory('conceal.factories.foo')
export class FooFactory {

	datas;
	constructor() {
		this.reload();
	}

	@conceal
	getRandomNumber() {
		return 10*Math.random()|0;
	}

	@conceal
	clear() {
		this.datas = [];
	}

	@conceal
	load() {
		let length = this.getRandomNumber();
		for(let i = 0; i<length; i++)
			this.datas.push(this.getRandomNumber());
	}

	reload() {
		this.clear();
		this.load();
	}

}


@service('conceal.services.bar')
@inject(FooFactory)
export class BarService {

	@attach(FooFactory)
	@conceal
	foo;

	publicMethod() {
		return this.foo;
	}

}

@controller('conceal.controllers.foobar')
@inject(FooFactory)
export class FooBarController {

	@attach(FooFactory, 'datas')
	@conceal
	datas;

	publicProperty = 0;

}


[
	FooFactory,
	BarService,
	FooBarController
].forEach(component => component.autodeclare(app));
