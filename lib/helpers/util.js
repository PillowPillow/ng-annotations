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