const wmerge = require('webpack-merge');
const common = require('./webpack.common');

let data = wmerge(common, {
	devtool: 'source-map',
	output: {
        path: './dist',
		filename: 'app.js'
	},
	entry: [
		'./lib/app'
	]
});

module.exports = data;
