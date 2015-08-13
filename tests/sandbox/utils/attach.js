import {service, controller, attach, inject} from '../../../src/app';
import app from '../index';

@service('attach.services.foo')
export class Serv {
	datas = [];
	constructor() {
		this.init();
	}

	getRnd() {
		return 100* Math.random()|0;
	}

	init() {
		this.datas = [this.getRnd(),this.getRnd(),this.getRnd()];
	}

	getLength() {
		return this.datas.length;
	}

	clearReference() {
		this.init();
	}
}

@controller('attach.controllers.crash')
export class Ctrl {
	@attach(Serv, 'datas')
	attachedData;
}

@controller('attach.controllers.safe')
@inject(Serv)
export class SafeCtrl {
	@attach(Serv, 'datas')
	attachedData;

	@attach(Serv, 'getLength')
	getLength;
}


[
	Serv,
	SafeCtrl,
	Ctrl
].forEach(component => component.autodeclare(app));
