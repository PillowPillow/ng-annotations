const wmerge = require('webpack-merge');
const common = require('./webpack.common');
const packageJson = require('../package.json');

let data = wmerge(common, {
	devtool: 'source-map',
	output: {
        path: './dist',
		filename: packageJson.name + '.js'
	},
	entry: [
		'./lib/app'
	]
});

module.exports = data;
