const wmerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = wmerge(common, {
	resolve: {
		root: './lib'
	},

	module: {
		postLoaders: [
			{
				test: /\.(js)$/,
				loader: 'istanbul-instrumenter-loader',
				include: './lib',
				exclude: [
					/\.(e2e|spec)\.js$/,
					/node_modules/
				]
			}
		],
		loaders: [
			{
				test: /\.(spec|e2e)\.js$/,
				loader: "babel-loader"
			}
		]
	}
});