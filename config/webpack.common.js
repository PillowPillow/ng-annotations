const webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	debug: false,
	cache: true,
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [
					/_old/,
					/\.(e2e|spec)\.js$/,
					/node_modules/
				],
				loader: "babel-loader"
			}
		]
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
