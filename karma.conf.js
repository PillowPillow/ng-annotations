var webpackconfig = require(__dirname + '/webpack/webpack.dev.config.js');

module.exports = function(config) {

	var configuration = {};


    configuration.browsers =['Firefox'];

	configuration.frameworks = ['mocha','chai'];
	configuration.files = ['*.js'];


	configuration.files = [
		'node_modules/angular/angular.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'tests/*.test.js',
		'tests/**/*.test.js'
	];

	configuration.reporters = ['mocha'];

	configuration.preprocessors = {
		'tests/*.js': ['webpack'],
		'tests/**/*.js': ['webpack']
	};

	configuration.webpack = {
		resolve: webpackconfig.resolve,
		module: webpackconfig.module
	};

	configuration.webpackMiddleware = {
		noInfo: true
	};

    configuration.phantomjsLauncher = {
      exitOnResourceError: true
    };

	configuration.plugins = [
		require('karma-webpack'),
		require('karma-mocha'),
		require('karma-chai'),
		require('karma-mocha-reporter'),
		require('karma-firefox-launcher')
	];

	config.set(configuration);
}