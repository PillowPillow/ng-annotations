import {getIdentifier} from '../../helpers/identifier';
import {STRUCT_KEYS} from '../../constants/enums';

export function conceal(prototype, name, descriptor) {
	if(name === undefined)
		throw Error(`@conceal decorator can only be applied to methods or attributes`);

	let descriptorDefined = true;
	if(name && !descriptor) {
		descriptorDefined = false;
		descriptor = {};
	}

	if(descriptor !== undefined)
		descriptor.writable = true;

	let $private = getIdentifier(STRUCT_KEYS.private);

	if(prototype[$private] === undefined
	   || !(prototype[$private] instanceof Array))
		prototype[$private] = [];

	prototype[$private].push(name);

	if(!descriptorDefined)
		Object.defineProperty(prototype, name, {value: prototype[name]});
}