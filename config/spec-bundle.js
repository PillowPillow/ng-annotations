Error.stackTraceLimit = Infinity;

var context = require.context('../lib', true, /\.spec\.js/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(context);