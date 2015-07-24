var config = {};

/*modules*/
var Path = require('path'),
	webpack = require('webpack');

/*consts*/
var project = Path.join(__dirname, '..'),
	wdir = Path.join(project, 'example/webpack'),
	entryfile = Path.join(wdir, 'app.js'),
	src = Path.join(project, 'src'),
	styles = Path.join(wdir, 'styles'),
	node_modules = Path.join(project, 'node_modules'),
	bower_components = Path.join(project, 'bower_components');

/*app folder paths*/
var modules = Path.join(wdir, 'modules');

config.entryfile = entryfile;
config.devtool = 'eval';
config.entry = {};
config.entry.vendors = ['angular'];
config.entry.app = [
    'webpack/hot/dev-server',
    entryfile
];

config.cache = true;

config.output = {
	publicPath: '/',
	filename: 'app.js',
	chunkFilename: '[chunkhash].bundle.js'
};

config.resolve = {};
config.resolve.extensions = ['', '.js', '.jsx', '.scss'];
config.resolve.root = modules;

config.module = {};
config.module.loaders = [
	{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
	{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
	{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
	{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
	{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    { test: /\.jade$/, loader: 'jade' },
	{ test: /\.css/, loader : 'style!css' },
	{ test: /\.scss$/, loader : 'style!css!sass' },
    {
        test: /\.js$/,
        loader: 'babel?experimental&optional=es7',
        exclude: [node_modules, bower_components]
    },
    {
        test: /\.jsx$/,
        loader: 'babel?experimental&optional=es7',
        exclude: [node_modules, bower_components]
    }
];


config.resolve.alias = {
	styles: styles,
	modules: modules,
	bower: bower_components,
	npm: node_modules,
	src: src,
	core: entryfile
};

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
];

module.exports = config;