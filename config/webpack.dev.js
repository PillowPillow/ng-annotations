const wmerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = wmerge(common, {
	output: {
		publicPath: '/',
		filename: 'app.js'
	},
	entry: [
		'webpack/hot/dev-server',
		'./example/app'
	],
	module: {
		loaders: [
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
			{test: /\.jade$/, loader: 'jade'},
			{test: /\.css/, loader: 'style!css'},
			]
	},
	resolve: {
		alias: {
			lib: __dirname + '/../lib'
		}
	}
});
