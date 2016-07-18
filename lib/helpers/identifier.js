import {uuid} from './util';

var ID_BANK = {};

export function getIdentifier(key) {
	if(ID_BANK[key] === undefined)
		ID_BANK[key] = global.Symbol ? Symbol(key) : uuid();
	return ID_BANK[key];
}