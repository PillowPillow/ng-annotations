import utils from 'src/libs/utils';

/**
 * @decorator: @isolate
 * @type: statement
 */
export default function conceal(prototype, name, descriptor) {

	if(name === undefined)
		throw Error(`@isolate decorator can only be applied to methods or attributes`);


	let $private = utils.getIdentifier('$private');

	if(prototype[$private] === undefined
	|| !(prototype[$private] instanceof Array))
		prototype[$private] = [];

	prototype[$private].push(name);
}