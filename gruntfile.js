var paths = {},
    Path = require('path');

paths.base = Path.normalize(__dirname);

module.exports = gruntConfig;

function gruntConfig(grunt) {

	var Configuration  = {};
	Configuration.package = grunt.file.readJSON('package.json');

	require('jit-grunt')(grunt, {
		'babel': 'grunt-babel'
	});
	require('time-grunt')(grunt);

	Configuration.babel = {};

	Configuration.babel.dist = {
		options: {
			sourceMap: false,
			optional: 'es7',
			modules: 'common'
		},
		files: [{
			expand: true,
			cwd: paths.base,
			ext: '.js',
			src: ['example/es6/**/*.es6'],
			dest: paths.base
		}]
	};

	grunt.initConfig(Configuration);

	grunt.registerTask('es6', ['babel:dist']);
}