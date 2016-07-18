Error.stackTraceLimit = Infinity;

var context = require.context('../lib', true, /\.spec\.js/);
global.angular = require('angular');
require('angular-mocks');

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

var modules = requireAll(context);