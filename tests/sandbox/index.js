var name;

try {name = angular.module('sandbox').name}
catch(err) {name = angular.module('sandbox', []).name}

export default name;