import {REGEX_NG_ARGS, REGEX_STRIP_COMMENT} from '../constants/regex';

export function uuid(pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
	return pattern.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export function arrayUnique(array = []) {
	var noDuplicateArray = [];

	for(let element of array)
		if(!~noDuplicateArray.indexOf(element))
			noDuplicateArray.push(element);

	return noDuplicateArray;
}

export function extractParamsFromFunction(fn) {
	var fnText = fn.toString().replace(REGEX_STRIP_COMMENT, ''),
		args = fnText.match(REGEX_NG_ARGS);
	return args && args[1].length > 0 ? args[1].split(',') : [];
}
