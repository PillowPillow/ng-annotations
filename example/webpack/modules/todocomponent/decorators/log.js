import {decorator, inject, attach, conceal} from 'src/app';

@decorator('$log')
@inject('$delegate')
export default class DecoratedLogger {

	// @attach('$delegate')
	// @conceal delegate;

	constructor(delegate) {
		delegate.special = (...tolog) => this.specialLog(...tolog);
	}

	specialLog(...tolog) {
		console.log('SPECIAL LOGGER:', ...tolog);
	}

	// this statement is implicit
	// $decorate() {
	// 	return this.delegate;
	// }
}